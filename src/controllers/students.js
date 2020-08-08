const _ = require("lodash");
const { Op } = require("sequelize");

const fs = require("fs");
const csv = require("fast-csv");

const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");
const {
  studentFields,
  parentFields,
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

exports.getStudentsCountByAcademicYear = catchAsync(async (req, res) => {
  const studentsCount = await models.Enrollment.count({
    where: {
      academicYearId: req.params.academicYearId,
    },
  });

  if (!studentCount) {
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });
  }

  return res.status(200).send({
    status: "success",
    data: {
      count: studentsCount,
    },
  });
});

exports.getStudentsCountByMajorAndAcademicYear = catchAsync(
  async (req, res) => {
    const studentsCount = await models.Enrollment.count({
      where: {
        academicYearId: req.params.academicYearId,
        majorId: req.params.majorId,
      },
    });

    if (!studentsCount) {
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });
    }

    return res.status(200).send({
      status: "success",
      data: {
        count: studentsCount,
      },
    });
  }
);

exports.getStudentsCountBySubjectAndGrade = catchAsync(async (req, res) => {
  const { subjectId } = await models.Subject.findOne({
    where: {
      name: {
        [Op.like]: `%${req.params.name}%`,
      },
    },
  });
  const { courseId } = await models.Course.findOne({
    subjectId: subjectId,
    majorId: req.params.majorId,
  });
  const gradings = await models.Grading.findAll({
    where: {
      courseId,
      gradeId: req.params.gradeId,
    },
  });
  if (!gradings) {
    res.status(404).send({
      status: "fail",
    });
  }
  res.status(200).send({
    status: "success",
    count: gradings.length,
  });
});

exports.getStudentGPA = catchAsync(async (req, res, next) => {
  const enrollemnt = await models.Enrollment.findOne({
    where: {
      studentId: req.params.studentId,
      attendanceYearId: req.params.attendanceYearId,
    },
    include: [
      {
        model: models.Grading,
        as: "grading",
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.status(200).send({
    status: "success",
    enrollemnt,
  });
});

exports.filterStudents = catchAsync(async (req, res) => {
  const students = await models.Enrollment.findAll({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  if (!students.length > 0)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      students,
    },
  });
});

exports.getStudent = catchAsync(async (req, res) => {
  const student = await models.Student.findOne({
    where: {
      studentId: req.params.studentId,
    },
    include: [
      {
        all: true,
        nested: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  if (student.length < 0)
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
exports.getParent = catchAsync(async (req, res) => {
  const parent = await models.Parent.findAll({
    where: {
      studentId: req.params.studentId,
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
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

exports.getAcademicHistories = catchAsync(async (req, res) => {
  const histories = await models.Enrollment.findAll({
    where: {
      studentId: req.params.studentId,
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  if (!histories.length > 0)
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

exports.getStudentsByTownshipId = catchAsync(async (req, res) => {
  const students = await models.Student.findAll({
    where: {
      townshipId: req.params.townshipId,
    },
    include: [
      {
        all: true,
        nested: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  if (!students)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      students,
    },
  });
});

exports.getStudentsByRegionId = catchAsync(async (req, res) => {
  const students = await models.Student.findAll({
    include: [
      {
        model: models.Township,
        as: "township",
        required: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: models.Region,
            as: "region",
            required: true,
            where: { regionId: req.params.regionId },
            attributes: { exclude: ["createdAt", "updatedAt"] },
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
      students,
    },
  });
});

exports.addStudent = catchAsync(async (req, res) => {
  const student = await models.Student.create(_.pick(req.body, studentFields));
  const parent = await student.createParent(_.pick(req.body, parentFields));
  res.status(201).send({
    status: "success",
    student,
    parent,
  });
});

exports.deleteStudent = catchAsync(async (req, res) => {
  await models.Student.destroy({
    where: {
      studentId: req.params.studentId,
    },
  });
  return res.status(200).json({
    status: "success",
  });
});
