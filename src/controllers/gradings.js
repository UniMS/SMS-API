const _ = require("lodash");
const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");
const calculateGPA = require("../utils/calculateFinalYearGPA");

exports.filterGradings = catchAsync(async (req, res) => {
  const exam = await models.Exam.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
    },
    attributes: ["examId"],
  });

  if (!exam)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  const subjects = await models.Course.findAll({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
    },
    attributes: [],
    include: [
      {
        model: models.Subject,
        as: "subject",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  const gradings = await models.Grading.findAll({
    where: {
      examId: exam.examId,
    },
    attributes: ["gradingId"],
    include: [
      {
        model: models.Enrollment,
        as: "enrollment",
        attributes: ["enrollmentId", "rollNo"],
      },
      {
        model: models.Grade,
        as: "grade",
        attributes: ["name"],
      },
    ],
    raw: true,
    nest: true,
  });

  const enrollmentById = {};
  const gradesByEnrollmentId = {};

  gradings.forEach((grading) => {
    if (!gradesByEnrollmentId[grading.enrollment.enrollmentId]) {
      gradesByEnrollmentId[grading.enrollment.enrollmentId] = [
        grading.grade.name,
      ];
    } else {
      gradesByEnrollmentId[grading.enrollment.enrollmentId].push(
        grading.grade.name
      );
    }

    if (!enrollmentById[grading.enrollment.enrollmentId]) {
      enrollmentById[grading.enrollment.enrollmentId] = {
        ...grading.enrollment,
      };
    }
  });

  const result = {
    gradings: Object.values(enrollmentById).map((enrollment) => ({
      ...enrollment,
      grades: gradesByEnrollmentId[enrollment.enrollmentId],
    })),
  };

  if (!result)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      subjects,
      result,
    },
  });
});

/*
--------------------------------------------
GPA
--------------------------------------------
*/
exports.getFinalYearGPA = catchAsync(async (req, res) => {
  const academicYearId = req.params.academicYearId;
  const rollNo = req.params.rollNo;
  if (academicYearId === 1 || academicYearId === 2 || academicYearId === 3)
    if (rollNo.startsWith("6"))
      return res.status(200).json({
        status: "fail",
        message: "Invalid academic year and roll-no.",
      });

  const gradings = await models.Enrollment.findAll({
    where: {
      academicYearId: academicYearId,
      rollNo,
    },
    attributes: ["enrollmentId"],
    include: [
      {
        model: models.Grading,
        as: "grading",
        attributes: ["gradeId"],
        include: [{ model: models.Grade, as: "grade", attributes: ["name"] }],
      },
    ],
    raw: true,
    nest: true,
  });

  const finalYearGPA = calculateFinalYearGPA(gradings);

  if (!gradings)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      finalYearGPA,
    },
  });
});

exports.getCumulativeGPA = catchAsync(async (req, res) => {
  const academicYearId = req.params.academicYearId;
  const rollNo = req.params.rollNo;

  // get academic year for response
  const academicYear = await models.AcademicYear.findOne({
    where: {
      academicYearId,
    },
    attributes: ["name"],
  });

  // get studentId where matches with given roll-no and academic year
  const student = await models.Enrollment.findOne({
    where: {
      academicYearId,
      rollNo,
    },
    attributes: ["studentId"],
  });

  if (!student)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  // get enrollments where studentId
  const enrollments = await models.Enrollment.findAll({
    where: {
      studentId: student.studentId,
    },
    attributes: ["enrollmentId"],
  });

  let gradings = [];
  const promises = enrollments.map(async (enrollment) => {
    const grading = await models.Grading.findAll({
      where: {
        enrollmentId: enrollment.enrollmentId,
      },
      attributes: [],
      include: [
        {
          model: models.Grade,
          as: "grade",
          attributes: ["name"],
        },
        {
          model: models.Remark,
          as: "remark",
          attributes: ["name"],
        },
      ],
    });

    gradings.push(grading);
  });
  await Promise.all(promises);

  let passGradings = gradings.filter((arr) =>
    arr.every((obj) => obj.remark.name !== "Fail")
  );

  let totalPoints = [];
  passGradings.map((grading) => {
    let totalPointsInYear = 0;

    grading.map((g) => {
      const grade = g.grade.name;
      let point = 0;

      if (grade === "A+" || grade === "A") point = 5;
      else if (grade === "A-" || grade === "B+") point = 4.5;
      else if (grade === "B") point = 4;
      else if (grade === "B-" || grade === "C+") point = 3.5;
      else if (grade === "C") point = 3;
      else if (grade === "C-") point = 2.5;

      totalPointsInYear += point;
    });
    totalPoints.push(totalPointsInYear);
  });

  const cumulativeGPA = _.round(_.sum(totalPoints) / totalPoints.length, 1);

  return res.status(200).json({
    status: "success",
    data: {
      academicYear,
      rollNo,
      cumulativeGPA,
    },
  });
});

/*
--------------------------------------------
Marks
--------------------------------------------
*/
exports.getAllYearMarks = catchAsync(async (req, res) => {
  const student = await models.Enrollment.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      rollNo: req.params.rollNo,
    },
    include: [{ model: models.Student, as: "student", attributes: ["nameEn"] }],
    attributes: ["studentId"],
  });

  if (!student)
    return res.status(200).json({
      status: "fail",
      message: "No data!",
    });

  const enrollments = await models.Enrollment.findAll({
    where: {
      studentId: student.studentId,
    },
    include: [
      {
        model: models.Degree,
        as: "degree",
        attributes: ["name"],
      },
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
    ],
    attributes: ["enrollmentId"],
  });

  const promises = enrollments.map(async (enrollment) => {
    const marks = await models.Grading.findAll({
      where: {
        enrollmentId: enrollment.enrollmentId,
      },
      include: [
        {
          model: models.Course,
          as: "course",
          attributes: ["courseId"],
          include: [
            {
              model: models.Subject,
              as: "subject",
              attributes: ["name"],
            },
          ],
        },
      ],
      attributes: ["enrollmentId", "mark"],
    });

    return marks;
  });

  const results = await Promise.all(promises);

  return res.status(200).json({
    status: "success",
    data: {
      student,
      enrollments,
      results,
    },
  });
});

exports.updateGrading = catchAsync(async (req, res) => {
  const grading = await models.Grading.update(req.body, {
    where: {
      gradingId: req.params.gradingId,
    },
  });
  return res.status(200).json({
    status: "success",
    data: {
      grading,
    },
  });
});

exports.deleteGrading = catchAsync(async (req, res) => {
  const grading = await models.Grading.destroy({
    where: {
      gradingId: req.params.gradingId,
    },
  });

  return res.status(200).json({
    status: "success",
    data: {
      grading,
    },
  });
});

exports.getGradingsByStudentId = catchAsync(async (req, res) => {
  const enrollments = await models.Enrollment.findAll({
    where: { studentId: req.params.studentId },
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
        model: models.Degree,
        as: "degree",
        attributes: ["name", "description"],
      },
    ],
    attributes: ["enrollmentId", "academicYearId", "attendanceYearId"],
  });

  const results = enrollments.map(async (enrollment) => {
    let gradings = await models.Grading.findAll({
      where: {
        enrollmentId: enrollment.enrollmentId,
      },
      include: [
        {
          all: true,
        },
      ],
    });

    return {
      attendanceYear: enrollment.attendanceYear.name,
      academicYear: enrollment.academicYear.name,
      degree: enrollment.degree,
      gradings,
    };
  });

  const gradings = await Promise.all(results);

  if (gradings.length <= 0)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      gradings,
    },
  });
});
