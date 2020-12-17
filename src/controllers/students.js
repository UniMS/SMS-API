const _ = require('lodash');
const { Op } = require('sequelize');
const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { moveFile } = require('../utils/moveFile');
const uploadImages = require('../middlewares/uploadImages');

const models = require('../database/models');
const {
  csvStudentHeaders,
  csvStudentAttributes,
  csvParentAttributes,
  csvEnrollmentAttributes,
  studentAttributes,
  parentAttributes,
  studentImageAttributes,
  parentImageAttributes,
} = require('../utils/fields');

// always assuming that this functionality is only for importing first* year students
exports.importWithCSV = async (req, res) => {
  let metaData = [];
  let csvStudents = [];
  let studentData = [];
  let stdData = [];
  let myd = [];

  const academicYearId = req.params.academicYearId;
  const attendanceYearId = req.params.attendanceYearId;
  const majorId = req.params.majorId;

  // if academic year or attendance year or major did not include
  if (!academicYearId || !attendanceYearId || !majorId)
    return res.status(400).send({
      status: 'fail',
      message:
        'Invalid Operation! Please choose academic year, attendance year or major.',
    });

  // if invalid file type
  if (!req.file.mimetype.includes('csv'))
    return res.status(400).send({
      status: 'fail',
      message: 'Invalid input. Only CSV files are allowned.',
    });

  // get religions from database
  const religionsList = await models.Religion.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    raw: true,
  });

  // get ethnicities from database
  const ethnicitiesList = await models.Ethnicity.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    raw: true,
  });

  // get townships from database
  const townshipsList = await models.Township.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    raw: true,
  });

  fs.createReadStream(req.file.path)
    .pipe(
      csv.parse({
        ignoreEmpty: true,
        trim: true,
        headers: csvStudentHeaders,
        renameHeaders: true,
      })
    )
    .on('error', (error) => console.log(error))
    .on('data', (row) => {
      // parsing and storing rows
      csvStudents.push(row);
    })
    .on('end', () => {
      fs.unlinkSync(req.file.path);

      // gender ( Male -> 0, Female -> 1)
      csvStudents.map((student) => {
        if (student.gender == 'Male') return (student.gender = 0);
        else if (student.gender == 'Female') return (student.gender = 1);
        return student;
      });

      csvStudents.map((student) => {
        // religion ( Buddhism -> 1)
        religionsList.find((element) => {
          if (student.religion === element.name)
            return (student.religion = element.religionId);
        });

        // ethnicity 1 and ethnicity 2 ( Ahu -> 1)
        ethnicitiesList.find((element) => {
          if (student.ethnicity1 === element.name)
            return (student.ethnicity1 = element.ethnicityId);

          if (student.ethnicity2 === element.name)
            return (student.ethnicity2 = element.ethnicityId);
        });

        // township ( Myanaung -> 1)
        townshipsList.find((element) => {
          if (student.township === element.name)
            return (student.township = element.townshipId);
        });
      });

      console.log(csvStudents);

      // * preparing csv object into structured object
      const result = [];
      csvStudents.map((data) => {
        let enrollment = _.pick(data, csvEnrollmentAttributes);

        enrollment = {
          ...enrollment,
          academicYearId,
          attendanceYearId,
          majorId,
          statusId: 1, // always assuming that this functionality is only for importing first year students
        };

        const student = _.pick(data, csvStudentAttributes);
        const parent = _.pick(data, csvParentAttributes);

        result.push({ student, parent, enrollment });
      });

      // * getting ids for foreign keys
      // const townships =
    });

  // fs.createReadStream(req.file.path)
  //   .pipe(
  //     csv.parse({
  //       trim: true,
  //     })
  //   )
  //   .on("error", (error) => console.error(error))
  //   .on("data", (row) => {
  //     csvData.push(_.compact(row));
  //   })
  //   .on("end", async () => {
  //     fs.unlinkSync(req.file.path);

  //     metaData = csvData.splice(2, 4);

  //     metaData = _.fromPairs(metaData);

  //     /*
  //     [
  //       ["academicYear", "2019..."]
  //       ["attendanceYear", "2019..."]

  //       {
  //         academic_year: 2019,
  //         attendance_year: 2019
  //       }
  //     ]
  //     */

  //     const mapKeyMetaData = {
  //       academic_year: "academicYearId",
  //       attendance_year: "attendanceYearId",
  //       major: "majorId",
  //       degree: "degreeId",
  //     };

  //     metaData = _.mapKeys(metaData, function (value, key) {
  //       return mapKeyMetaData[key];
  //     });

  //     studentData = csvData.splice(4);

  //     const formattedData = getHeaders(studentData, csvStudentDataEntryFields);

  //     const ee = formattedData.map((data) => {
  //       return { ...data, ...metaData, remarkId: 1 };
  //     });

  //     const data = ee.map((data) => {
  //       const student = _.pick(data, studentFields);
  //       const parent = _.pick(data, parentFields);
  //       const enrollment = _.pick(data, enrollmentFields);
  //       return [student, parent, enrollment];
  //     });

  //     const insertedData = [];

  //     const promises = data.map(async (d) => {
  //       const township = d[0].townshipId;
  //       const ethnicity = d[0].ethnicityId;
  //       const religion = d[0].religionId;
  //       const parentTownship = d[1].parentTownshipId;

  //       console.log("--------------");
  //       console.log(d);
  //       console.log("--------------");

  //       const studentData = _.pick(d[0], [
  //         "nameEn",
  //         "nameMm",
  //         "nrc",
  //         "gender",
  //         "birthday",
  //         "phone",
  //         "address",
  //         "hostelAddress",
  //       ]);

  //       studentData.gender = studentData.gender === "Male" ? 0 : 1;

  //       // get townshipId
  //       // const { townshipId } = await models.Township.findOne({
  //       //   where: {
  //       //     name: township,
  //       //   },
  //       //   attributes: ["townshipId"],
  //       //   raw: true,
  //       // });

  //       // get parentTownshipId
  //       // const { townshipId: parentTownshipId } = await models.Township.findOne({
  //       //   where: {
  //       //     name: parentTownship,
  //       //   },
  //       //   attributes: ["townshipId"],
  //       //   raw: true,
  //       // });

  //       // get ethnicityId
  //       // const { ethnicityId } = await models.Ethnicity.findOne({
  //       //   where: {
  //       //     name: ethnicity,
  //       //   },
  //       //   attributes: ["ethnicityId"],
  //       //   raw: true,
  //       // });

  //       // get religinoId
  //       // const { religionId } = await models.Religion.findOne({
  //       //   where: {
  //       //     name: religion,
  //       //   },
  //       //   attributes: ["religionId"],
  //       //   raw: true,
  //       // });

  //       // prepare student data with above ids
  //       // const student = {
  //       //   ...d[0],
  //       //   gender,
  //       //   townshipId,
  //       //   ethnicityId,
  //       //   religionId,
  //       // };
  //       // insert student data
  //       let std = await models.Student.create(
  //         {
  //           nameEn: "Htet Phyo Naing",
  //           nameMm: "ထက်ဖြိုးနိုင်",
  //           nrc: "1/MaMaMa(N) 222222",
  //           gender: 0,
  //           birthday: "2020-07-30",
  //           phone: "11111111111",
  //           address: "address1",
  //           hostelAddress: "hostel addr 1",
  //           townshipId: 1,
  //           ethnicityId: 2,
  //           religionId: 2,
  //           parent: [{ ...d[1], parentTownshipId: 1 }],
  //           // enrollment: [{ ...d[2] }],
  //         },
  //         { include: ["parent"] }
  //       );

  //       // prepare parent data with above ids and lastInserted studnet Id
  //       // const parent = {
  //       //   ...d[1],
  //       //   parentTownshipId,
  //       //   studentId: std.studentId,
  //       // };
  //       // insert parent data
  //       // await models.Parent.create(parent);

  //       // get inserted student and parent data
  //       const mydata = await models.Student.findOne({
  //         where: {
  //           studentId: std.studentId,
  //         },
  //         include: [
  //           {
  //             all: true,
  //             nested: true,
  //             attributes: { exclude: ["createdAt", "updatedAt"] },
  //           },
  //         ],
  //       });

  //       insertedData.push(mydata);
  //     }); // end data.map

  //     await Promise.all(promises);

  //     return res.status(201).send({
  //       status: "success",
  //       insertedData,
  //     });
  //   });
};

function getHeaders(csvData, headers) {
  let result = {};
  result = csvData.map((data) => {
    return _.zipObject(headers, data);
  });

  return result;
}

/**
 * * verified
 * @filterStudents filters students according to academic year and major
 *
 * @params academicYearId and majorId
 */
exports.filterStudents = async (req, res) => {
  const accessableMajors = req.majors;
  const academicYearId = req.params.academicYearId;
  const majorId = req.params.majorId;

  if (!accessableMajors)
    return res.status(404).json({
      status: 'fail',
      message:
        "Something went wrong! DEV_MSG: You didn't login or didn't have sufficient authority to perform this functionality.",
    });

  if (isNaN(parseInt(majorId)) || !accessableMajors.includes(parseInt(majorId)))
    return res.status(403).json({
      status: 'fail',
      message:
        'Something went wrong! DEV_MSG: You are requesting unauthorized data with insufficient role.',
    });

  let students = await models.AttendanceYear.findAll({
    include: [
      {
        model: models.Enrollment,
        where: {
          academicYearId,
          majorId,
        },
        as: 'enrollments',
        attributes: ['rollNo'],
        include: [
          {
            model: models.Status,
            as: 'status',
            attributes: ['name'],
          },
          {
            model: models.Student,
            as: 'student',
            attributes: [
              'studentId',
              'nameEn',
              'nrc',
              'gender',
              'phone',
              'address',
              'hostelAddress',
            ],
            include: [
              {
                model: models.Parent,
                as: 'parent',
                attributes: ['parentId', 'fatherNameEn', 'fatherNrc'],
              },
              {
                model: models.Township,
                as: 'township',
                attributes: ['name'],
              },
            ],
          },
        ],
      },
    ],
  });

  if (!students.length)
    return res.status(404).json({
      status: 'fail',
      message: 'No data!',
    });

  return res.status(200).json({
    status: 'success',
    data: {
      count: students.length,
      students,
    },
  });
};

/**
 * ! deprecated
 * * verified
 * @filterStudentsByAcademicYear filters students according to ONLY academic year.
 *
 * @params academicYearId
 */
exports.filterStudentsByAcademicYear = async (req, res) => {
  const academicYearId = req.params.academicYearId;

  if (!req.majors)
    return res.status(404).json({
      status: 'fail',
      message: 'Something went wrong!',
    });

  const where = {
    [Op.or]: req.majors.map((majorId) => ({ majorId: majorId })),
  };

  let students = await models.Major.findAll({
    where,
    attributes: ['majorId', 'name'],
    include: [
      {
        model: models.AttendanceYear,
        as: 'attendanceYears',
        attributes: ['name'],
        include: [
          {
            model: models.Enrollment,
            where: {
              academicYearId,
            },
            as: 'enrollments',
            attributes: ['attendanceYearId', 'rollNo'],
            include: [
              {
                model: models.Student,
                as: 'student',
                attributes: [
                  'studentId',
                  'nameEn',
                  'nrc',
                  'gender',
                  'phone',
                  'address',
                ],
                include: [
                  {
                    model: models.Parent,
                    as: 'parent',
                    attributes: ['parentId', 'fatherNameEn', 'fatherNrc'],
                  },
                  {
                    model: models.Township,
                    as: 'township',
                    attributes: ['name'],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  students = _.compact(
    students.map((student) => {
      if (student.attendanceYears.length === 0) delete student;
      else return student;
    })
  );

  if (!students.length)
    return res.status(404).json({
      status: 'fail',
      message: 'No data!',
    });

  return res.status(200).json({
    status: 'success',
    data: {
      count: students.length,
      students,
    },
  });
};

/**
 * * verified
 * @getStudent gets a student with the given studentId.
 *
 * @params studentId
 */
exports.getStudent = async (req, res) => {
  const studentId = req.params.studentId;

  const student = await models.Student.findOne({
    where: { studentId },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        // TODO: to get latest `createdAt` enrollment field
        model: models.Enrollment,
        as: 'enrollment',
        attributes: ['enrollmentId', 'rollNo'],
        include: [
          {
            model: models.Status,
            as: 'status',
            attributes: ['statusId', 'name'],
          },
          {
            model: models.AcademicYear,
            as: 'academicYear',
            attributes: ['academicYearId', 'name'],
          },
          {
            model: models.AttendanceYear,
            as: 'attendanceYear',
            attributes: ['attendanceYearId', 'name'],
          },
          {
            model: models.Major,
            as: 'major',
            attributes: ['majorId', 'name'],
          },
        ],
      },
      {
        model: models.Township,
        as: 'township',
        include: [
          {
            model: models.Region,
            as: 'region',
          },
        ],
      },
      {
        model: models.Religion,
        as: 'religion',
      },
      {
        model: models.Ethnicity,
        as: 'ethnicities',
      },
    ],
    nest: true,
  });

  if (!student)
    return res.status(404).json({ status: 'fail', message: 'No data!' });

  return res.status(200).json({ status: 'success', data: { student } });
};

/**
 * * verified
 * @updateStudent updates a student personal informaiton with the given studentId.
 *
 * find the @student with the given studentId if it is there.
 * req.body ထဲမှာ image related attributes တွေပါလား စစ်. ပါရင် ဆွဲထုတ်.
 * ပါတဲ့ image related attributes တွေရဲ့ name ကို @student ထဲကနေ pick. image names တွေရလာ.
 * image names တွေနဲ့ public/images/ ထဲမှာရှာပြီး public/images/history ထဲရွေ့.
 * req.file နဲ့ ဝင်လာတဲ့ ပုံအသစ်တွေကို multer memoryStorage နဲ့ buffer ပြောင်း. (diskStorage နဲ့ folder ထဲကိုတန်းသိမ်းလို့ရပေမဲ့ sharp နဲ့ resolution ချုံ့ဖို့ buffer ပြောင်းရ.)
 * ပုံတွေကို fieldName အရ rename လုပ်ပြီး public/images ထဲထည့်
 * ပုံနာမည်တွေရယ် အခြား textfields တွေကို update လုပ်.
 * studentId နဲ့ ပြန်ရှာပြီး response ပြန်.
 *
 * @params studentId
 */
exports.updateStudent = async (req, res) => {
  const studentId = req.params.studentId;

  const student = await models.Student.findByPk(studentId);
  if (!student)
    return res.status(404).json({
      status: 'fail',
      message: 'No data!',
    });

  const updatingAttributes = Object.keys(_.pick(req.body, studentAttributes));
  const updatingImageAttributes = _.intersection(
    updatingAttributes,
    studentImageAttributes
  );

  // update မှာ image attributes များပါလာမလား စစ်.
  if (updatingImageAttributes.length > 0) {
    const studentOldImages = _.pick(student, studentImageAttributes);

    // ပါလာရင် မူရင်းဟာတွေကို history ထဲကို ရွေ့
    if (studentOldImages.length !== 0) {
      for (const key in studentOldImages) {
        const path = `public/images`;
        const dist = `public/images/history`;
        moveFile(`${path}/${studentOldImages[key]}`, dist);
      }
    }
  }

  // update student data
  const hasUpdated = await models.Student.update(req.body, {
    where: { studentId },
  });

  if (!hasUpdated)
    return res.status(500).json({
      status: 'fail',
      message: 'Something is not right.',
    });

  const updatedStudent = await models.Student.findByPk(studentId, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: models.Township,
        as: 'township',
        attributes: ['name'],
        include: [
          {
            model: models.Region,
            as: 'region',
            attributes: ['name'],
          },
        ],
      },
      {
        model: models.Religion,
        as: 'religion',
        attributes: ['name'],
      },
      {
        model: models.Ethnicity,
        as: 'ethnicities',
        attributes: ['name'],
      },
    ],
  });
  return res.status(200).json({
    status: 'success',
    data: updatedStudent,
  });
};

/**
 * * verified
 * @getAttendanceHistories get attendance history of a student.
 *
 * @params studentId
 */
exports.getAttendanceHistories = async (req, res) => {
  const studentId = req.params.studentId;

  const histories = await models.Enrollment.findAll({
    where: { studentId },
    include: [
      {
        model: models.AcademicYear,
        as: 'academicYear',
        attributes: ['name'],
      },
      {
        model: models.AttendanceYear,
        as: 'attendanceYear',
        attributes: ['name'],
      },
      {
        model: models.Status,
        as: 'status',
        attributes: ['name'],
      },
    ],
    attributes: ['rollNo'],
  });

  if (!histories.length)
    return res.status(404).json({
      status: 'fail',
      message: 'No data!',
    });

  return res.status(200).json({
    status: 'success',
    data: {
      histories,
    },
  });
};

/**
 * * verified
 * @getParent gets parent information with the given studentId.
 *
 * @params studentId
 */
exports.getParent = async (req, res) => {
  const studentId = req.params.studentId;

  const parent = await models.Parent.findOne({
    where: { studentId },
    include: [
      {
        model: models.Township,
        as: 'parentTownship',
        attributes: ['name'],
        include: [
          {
            model: models.Region,
            as: 'region',
            attributes: ['name'],
          },
        ],
      },
    ],
  });

  if (!parent)
    return res.status(404).json({
      status: 'fail',
      message: 'No data!',
    });

  return res.status(200).json({
    status: 'success',
    data: {
      parent,
    },
  });
};

/**
 * * verified
 * @updateParent updates a parent personal informaiton with the given parentId.
 *
 * find the @parent with the given parentId if it is there.
 * req.body ထဲမှာ image related attributes တွေပါလား စစ်. ပါရင် ဆွဲထုတ်.
 * ပါတဲ့ image related attributes တွေရဲ့ name ကို @parent ထဲကနေ pick. image names တွေရလာ.
 * image names တွေနဲ့ public/images/ ထဲမှာရှာပြီး public/images/history ထဲရွေ့.
 * req.file နဲ့ ဝင်လာတဲ့ ပုံအသစ်တွေကို multer memoryStorage နဲ့ buffer ပြောင်း. (diskStorage နဲ့ folder ထဲကိုတန်းသိမ်းလို့ရပေမဲ့ sharp နဲ့ resolution ချုံ့ဖို့ buffer ပြောင်းရ.)
 * ပုံတွေကို fieldName အရ rename လုပ်ပြီး public/images ထဲထည့်
 * ပုံနာမည်တွေရယ် အခြား textfields တွေကို update လုပ်.
 * parentId နဲ့ ပြန်ရှာပြီး response ပြန်.
 *
 * @params parentId
 */
exports.updateParent = async (req, res) => {
  const parentId = req.params.parentId;

  const parent = await models.Parent.findByPk(parentId);
  if (!parent)
    return res.status(404).json({
      status: 'fail',
      message: 'No data!',
    });

  const updatingAttributes = Object.keys(_.pick(req.body, parentAttributes));
  const updatingImageAttributes = _.intersection(
    updatingAttributes,
    parentImageAttributes
  );

  // update မှာ image attributes များပါလာမလား စစ်.
  if (updatingImageAttributes.length > 0) {
    const parentOldImages = _.pick(parent, parentImageAttributes);

    // ပါလာရင် မူရင်းဟာတွေကို history ထဲကို ရွေ့
    if (parentOldImages.length !== 0) {
      for (const key in parentOldImages) {
        const path = `public/images`;
        const dist = `public/images/history`;
        moveFile(`${path}/${parentOldImages[key]}`, dist);
      }
    }
  }

  // update parent data
  const hasUpdated = await models.Parent.update(req.body, {
    where: { parentId },
  });

  if (!hasUpdated)
    return res.status(500).json({
      status: 'fail',
      message: 'Something is not right.',
    });

  const updatedParent = await models.Parent.findByPk(parentId, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: models.Township,
        as: 'parentTownship',
        attributes: ['name'],
        include: [
          {
            model: models.Region,
            as: 'region',
            attributes: ['name'],
          },
        ],
      },
    ],
  });
  return res.status(200).json({
    status: 'success',
    data: updatedParent,
  });
};
