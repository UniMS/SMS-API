const _ = require("lodash");
const { Op } = require("sequelize");

const fs = require("fs");
const csv = require("fast-csv");

const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");
const {
  studentFields,
  parentFields,
  csvStudentDataEntryFields,
} = require("../utils/fields");

exports.importWithCSV = catchAsync(async (req, res) => {
  let csvData = [];

  fs.createReadStream(req.file.path)
    .pipe(
      csv.parse({
        ignoreEmpty: true,
        trim: true,
        skipLines: 6,
      })
    )
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      csvData.push(getHeaders(_.compact(row), csvStudentDataEntryFields));
    })
    .on("end", async () => {
      fs.unlinkSync(req.file.path);

      const data = csvData.map((data) => {
        const student = _.pick(data, studentFields);
        const parent = _.pick(data, parentFields);
        return [student, parent];
      });

      const insertedData = [];

      const promises = data.map(async (d) => {
        const township = d[0].townshipId;
        const ethnicity = d[0].ethnicityId;
        const religion = d[0].religionId;
        const parentTownship = d[1].parentTownshipId;

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
  result = headers.reduce(
    (o, key, index) => ({ ...o, [key]: csvData[index] }),
    {}
  );
  return result;
}

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

// ------------------------------------------------------------------

exports.addStudent = catchAsync(async (req, res) => {
  const student = await models.Student.create(_.pick(req.body, studentFields));
  const parent = await student.createParent(_.pick(req.body, parentFields));
  res.status(201).send({
    status: "success",
    student,
    parent,
  });
});

exports.searchByCompleteRollNumber = catchAsync(async (req, res) => {
  const student = await models.Enrollment.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      rollNo: req.params.rollNo,
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
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

exports.searchByRollNumber = catchAsync(async (req, res) => {
  const student = await models.Enrollment.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
      rollNo: {
        [Op.like]: `%${req.params.rollNo}%`,
      },
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
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

exports.searchByNRC = catchAsync(async (req, res) => {
  const student = await models.Student.findOne({
    where: { nrc: req.params.nrc },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
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

exports.searchByEntranceNo = catchAsync(async (req, res) => {
  const student = await models.Student.findOne({
    where: { entranceNo: req.params.entranceNo },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
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

exports.searchByName = catchAsync(async (req, res) => {
  const student = await models.Enrollment.findAll({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
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
