const _ = require("lodash");

const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const { moveFile } = require("../utils/moveFile");
const uploadImages = require("../middlewares/uploadStudentImages");

const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");
const {
  studentFields,
  studentImageAttributes,
  parentFields,
  parentUploadFields,
  enrollmentFields,
  csvStudentDataEntryFields,
} = require("../utils/fields");

exports.importWithCSV = catchAsync(async (req, res) => {
  let metaData = [];
  let csvData = [];
  let studentData = [];
  let stdData = [];
  let myd = [];

  fs.createReadStream(req.file.path)
    .pipe(
      csv.parse({
        trim: true,
      })
    )
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      csvData.push(_.compact(row));
    })
    .on("end", async () => {
      fs.unlinkSync(req.file.path);

      metaData = csvData.splice(2, 4);

      metaData = _.fromPairs(metaData);

      /*
      [
        ["academicYear", "2019..."]
        ["attendanceYear", "2019..."]

        {
          academic_year: 2019,
          attendance_year: 2019
        }
      ]
      */

      const mapKeyMetaData = {
        academic_year: "academicYearId",
        attendance_year: "attendanceYearId",
        major: "majorId",
        degree: "degreeId",
      };

      metaData = _.mapKeys(metaData, function (value, key) {
        return mapKeyMetaData[key];
      });

      studentData = csvData.splice(4);

      const formattedData = getHeaders(studentData, csvStudentDataEntryFields);

      const ee = formattedData.map((data) => {
        return { ...data, ...metaData, remarkId: 1 };
      });

      const data = ee.map((data) => {
        const student = _.pick(data, studentFields);
        const parent = _.pick(data, parentFields);
        const enrollment = _.pick(data, enrollmentFields);
        return [student, parent, enrollment];
      });

      const insertedData = [];

      const promises = data.map(async (d) => {
        const township = d[0].townshipId;
        const ethnicity = d[0].ethnicityId;
        const religion = d[0].religionId;
        const parentTownship = d[1].parentTownshipId;

        console.log("--------------");
        console.log(d);
        console.log("--------------");

        const studentData = _.pick(d[0], [
          "nameEn",
          "nameMm",
          "nrc",
          "gender",
          "birthday",
          "phone",
          "address",
          "hostelAddress",
        ]);

        studentData.gender = studentData.gender === "Male" ? 0 : 1;

        // get townshipId
        // const { townshipId } = await models.Township.findOne({
        //   where: {
        //     name: township,
        //   },
        //   attributes: ["townshipId"],
        //   raw: true,
        // });

        // get parentTownshipId
        // const { townshipId: parentTownshipId } = await models.Township.findOne({
        //   where: {
        //     name: parentTownship,
        //   },
        //   attributes: ["townshipId"],
        //   raw: true,
        // });

        // get ethnicityId
        // const { ethnicityId } = await models.Ethnicity.findOne({
        //   where: {
        //     name: ethnicity,
        //   },
        //   attributes: ["ethnicityId"],
        //   raw: true,
        // });

        // get religinoId
        // const { religionId } = await models.Religion.findOne({
        //   where: {
        //     name: religion,
        //   },
        //   attributes: ["religionId"],
        //   raw: true,
        // });

        // prepare student data with above ids
        // const student = {
        //   ...d[0],
        //   gender,
        //   townshipId,
        //   ethnicityId,
        //   religionId,
        // };
        // insert student data
        let std = await models.Student.create(
          {
            nameEn: "Htet Phyo Naing",
            nameMm: "ထက်ဖြိုးနိုင်",
            nrc: "1/MaMaMa(N) 222222",
            gender: 0,
            birthday: "2020-07-30",
            phone: "11111111111",
            address: "address1",
            hostelAddress: "hostel addr 1",
            townshipId: 1,
            ethnicityId: 2,
            religionId: 2,
            parent: [{ ...d[1], parentTownshipId: 1 }],
            // enrollment: [{ ...d[2] }],
          },
          { include: ["parent"] }
        );

        // prepare parent data with above ids and lastInserted studnet Id
        // const parent = {
        //   ...d[1],
        //   parentTownshipId,
        //   studentId: std.studentId,
        // };
        // insert parent data
        // await models.Parent.create(parent);

        // get inserted student and parent data
        const mydata = await models.Student.findOne({
          where: {
            studentId: std.studentId,
          },
          include: [
            {
              all: true,
              nested: true,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        });

        insertedData.push(mydata);
      }); // end data.map

      await Promise.all(promises);

      return res.status(201).send({
        status: "success",
        insertedData,
      });
    }); // end readstream
});

function getHeaders(csvData, headers) {
  let result = {};
  result = csvData.map((data) => {
    return _.zipObject(headers, data);
  });

  return result;
}

/**
 * * verified
 * @filterStudents filters students according to academic year, major and attendance yera.
 *
 * @params academicYearId, majorId, attendanceYearId
 */
exports.filterStudents = catchAsync(async (req, res) => {
  const academicYearId = req.params.academicYearId;
  const majorId = req.params.majorId;
  const attendanceYearId = req.params.attendanceYearId;

  const students = await models.Enrollment.findAll({
    where: {
      academicYearId,
      majorId,
      attendanceYearId,
    },
    attributes: [],
    include: [
      {
        model: models.Student,
        as: "student",
        attributes: ["studentId", "nameEn", "nrc", "gender", "phone"],
        include: [
          {
            model: models.Parent,
            as: "parent",
            attributes: ["parentId", "fatherNameEn", "fatherNrc"],
          },
        ],
      },
    ],
  });

  if (!students.length)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      count: students.length,
      students,
    },
  });
});

/**
 * * verified
 * @getStudent gets a student with the given studentId.
 *
 * @params studentId
 */
exports.getStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;

  const student = await models.Student.findOne({
    where: { studentId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: models.Township,
        as: "township",
        attributes: ["name"],
        include: [
          {
            model: models.Region,
            as: "region",
            attributes: ["name"],
          },
        ],
      },
      {
        model: models.Religion,
        as: "religion",
        attributes: ["name"],
      },
      {
        model: models.Ethnicity,
        as: "ethnicities",
        attributes: ["name"],
      },
    ],
    nest: true,
  });

  if (!student)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.updateStudentImages = uploadImages;

/**
 * * verified
 * @updateStudent updates a student personal informaiton with the given studentId.
 *
 * find the student with the given studentId if it is there.
 * req.body ထဲမှာ image related attributes တွေပါလား စစ်. ပါရင် ဆွဲထုတ်.
 * ပါတဲ့ image related attributes တွေရဲ့ name ကိုလည်း studentId ပေါ်မူတည်ပြီး db ကဆွဲထုတ်. image names တွေရလာ.
 * image names တွေနဲ့ public/images/present ထဲမှာရှာပြီး public/images/history ထဲရွေ့.
 * req.file နဲ့ ဝင်လာတဲ့ ပုံအသစ်တွေကို multer memoryStorage နဲ့ buffer ပြောင်း. (diskStorag နဲ့ folder ထဲကိုတန်းသိမ်းလို့ရပေမဲ့ sharp နဲ့ resolution ချုံ့ဖို့ buffer ပြောင်းရ.)
 * ပုံတွေကို fieldName အရ rename လုပ်ပြီး public/images/present ထဲထည့်
 * ပုံနာမည်တွေရယ် အခြား textfields တွေကို update လုပ်.
 * studentId နဲ့ ပြန်ရှာပြီး response ပြန်.
 *
 * @params studentId
 */
exports.updateStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;

  const student = await models.Student.findByPk(studentId);
  if (!student)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  const updatingAttributes = Object.keys(_.pick(req.body, studentFields));
  const updatingImageAttributes = _.intersection(
    updatingAttributes,
    studentImageAttributes
  );

  // image moving to history dir
  if (updatingImageAttributes.length > 0) {
    const oldStudentImages = await models.Student.findOne({
      where: { studentId },
      raw: true,
      attributes: updatingImageAttributes,
    });

    // move existing photos to history
    for (const key in oldStudentImages) {
      const path = `public/images/present`;
      const dist = `public/images/history/`;
      moveFile(`${path}/${oldStudentImages[key]}`, dist);
    }
  }

  // update student data
  const hasUpdated = await models.Student.update(req.body, {
    where: { studentId },
  });

  if (!hasUpdated)
    return res.status(500).json({
      status: "fail",
      message: "Something is not right.",
    });

  const updatedStudent = await models.Student.findByPk(studentId, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: models.Township,
        as: "township",
        attributes: ["name"],
        include: [
          {
            model: models.Region,
            as: "region",
            attributes: ["name"],
          },
        ],
      },
      {
        model: models.Religion,
        as: "religion",
        attributes: ["name"],
      },
      {
        model: models.Ethnicity,
        as: "ethnicities",
        attributes: ["name"],
      },
    ],
  });
  return res.status(200).json({
    status: "success",
    data: updatedStudent,
  });
});

/**
 * * verified
 * @getAttendanceHistories get attendance history of a student.
 *
 * @params studentId
 */
exports.getAttendanceHistories = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;

  const histories = await models.Enrollment.findAll({
    where: { studentId },
    include: [
      {
        model: models.AcademicYear,
        as: "academicYear",
        attributes: ["name"],
      },
      {
        model: models.AttendanceYear,
        as: "attendanceYear",
        attributes: ["name"],
      },
      {
        model: models.Status,
        as: "status",
        attributes: ["name"],
      },
    ],
    attributes: ["rollNo"],
  });

  if (!histories.length)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      histories,
    },
  });
});

/**
 * * verified
 * @getParent gets parent information with the given studentId.
 *
 * @params studentId
 */
exports.getParent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;

  const parent = await models.Parent.findOne({
    where: { studentId },
    include: [
      {
        model: models.Township,
        as: "parentTownship",
        attributes: ["name"],
        include: [
          {
            model: models.Region,
            as: "region",
            attributes: ["name"],
          },
        ],
      },
    ],
  });

  if (!parent)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      parent,
    },
  });
});

exports.updateParent = catchAsync(async (req, res) => {
  const upload = Object.keys(_.pick(req.body, parentUploadFields));
  //search old parent data for deleting
  const oldParentData = await models.Parent.findOne({
    where: {
      parentId: req.params.parentId,
    },
    raw: true,
    attributes: upload,
  });

  //delete existing photo
  Object.values(oldParentData).map((photo) => {
    console.log(photo);
    fs.unlink(path.join(`public/images/`, photo), (err) => {
      console.log(err);
    });
  });

  //upload parent data
  const parent = await models.Parent.update(req.body, {
    where: {
      parentId: req.params.parentId,
    },
  });
  return res.status(200).json({
    status: "success",
    data: { parent },
  });
});
