const _ = require("lodash");
const { Op } = require("sequelize");
const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");

/**
 * * verified
 * @filterGradings filters gradings by academic year, major and attendance year.
 *
 * filter လုပ်မယ့် academic year, major နဲ့ attendance year တို့နဲ့ @exam table မှာရှာပြီး examId ယူ.
 * examId နဲ့ @grading table မှာ ထပ်ရှာပြီး rollNo နဲ့ Grade ယူ.
 * UI မှာပြဖို့ subjects တွေကိုလည်း ဝင်လာတဲ့ academic year, major နဲ့ attendance year နဲ့တိုက်ပြီး @courses table ကတဆင့် @subjects ကယူ.
 *
 * @params academicYearId, majorId, attendanceYearId
 */
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

  // get subjects for response
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
/**
 * * verified
 * @getFinalYearGAP returns final year GAP. It needs two parametrs: academic year and roll no.
 * ! rollno must be final year rollno.
 *
 * ဝင်လာတဲ့ academic year နဲ့ roll no နဲ့ကို @enrollments table မှာရှာပြီး enrollmentId ယူ.
 * enrollmentId နဲ့ @gradings table မှာ grade တွေယူ.
 * ရလာတဲ့ grades တွေကို range နဲ့ပြန်တွက်. @calculateFinalYearGPA
 *
 * @params academicYearId, rollNo
 */
exports.getFinalYearGPA = catchAsync(async (req, res) => {
  const academicYearId = req.params.academicYearId;
  const rollNo = req.params.rollNo;

  if (academicYearId == 1 || academicYearId == 2 || academicYearId == 3)
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

/**
 * * verified
 * @getCumulativeGPA returns cumulative GPA. It needs two parameters: academic year and roll no.
 * ! rollno must be final year rollno.
 *
 * ဝင်လာတဲ့ academic year နဲ့ roll no နဲ့ကို @enrollments table မှာရှာပြီး studentId ယူ.
 * studentId နဲ့ @enrollments table မှာ enrollmentIds တွေယူ. (ဒီကျောင်းသားတက်ခဲ့တဲ့ enrollmentId တွေရ.)
 * ရလာတဲ့ enrollmentId တစ်ခုချင်းအတွက် ရခဲ့တဲ့ gradings တွေနဲ့ remark (Fail, Pass, Pass with credit) တွေကို @gradings table မှာရှာ.
 * ရလာတဲ့ တစ်နှစ်ချင်းစီ gradings တွေထဲမှာ Fail တဲ့တစ်ဘာသာပါရင် အဲ့နှစ် gradings တစ်ခုလုံးကို ဖြုတ်. (အောင်တဲ့နှစ်ရဲ့ gradings တွေပဲရ.)
 * အောင်တဲ့နှစ်တွေရဲ့ gradings တွေရလာပြီဆိုရင် တစ်နှစ်ချင်းစီအတွက် grades တွေကို range နဲ့ ပြန်တွက်. @totalPoints
 *
 * @params academicYearId, rollNo
 */
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

/**
--------------------------------------------
Gradings
--------------------------------------------
*/
/**
 * * verified
 * @generateGradings returns passing gradings. Generating gradings can be done by 2 options:
 * * 1 - for from-academic-year to to-academic-year -> /degree/1/from/2/to/4/roll-no/4IST-44
 * * 2 - for x-academic-year                        -> /degree/1/from/2/to/2/roll-no/3IST-33
 *
 * db logic တူတဲ့အတွက် option ၂ ခုလုံးကို method တစ်ခုထဲမှာ ပေါင်းရေးထားပါတယ်. condition ကတော့ မတူတဲ့အတွက် @where object ကိုတော့ condition ပေါ်မူတည်ပြီး ပြောင်းရပါတယ်.
 * from-academic-year နဲ့ to-academic-year နဲ့မှာ to-academic-year က ကြီးရင် option 1 ဖြစ်. တူရင် option 2 ဖြစ်. ငယ်ရင် invalid ဖြစ်.
 *
 * option 1 - က နှစ်-range နဲ့ ထုတ်မှာမလို့ ဝင်လာတဲ့ from/to academic year တွေအရ range array ဆောက်. (e.g. from 2015-2016 to 2019-2020 ဆိုရင် (ကျောင်းစဖွင့်တဲ့ နှစ် 2010-2011 က db မှာ 1 ဆိုတော့) [6, 7, 8, 9, 10] ရ. )
 * 1 - ဝင်လာတဲ့ degreeId,
 * 2 - <to-academic-year နဲ့ to-academic-year မှာတက်ခဲ့တဲ့ rollno> တို့ကိုသုံးပြီး @enrollments table ကနေယူထားတဲ့ studentId,
 * 3 - ဝင်လာတဲ့ from/to academic-year တွေအရ academic-year range array.
 *
 * option 2 - က တစ်နှစ်စာပဲထုတ်မှာမလို့ option 1 က ၃အချက်ရဲ့အောက်ဆုံးအချက်နေရာမှာ ဝင်လာတဲ့x-academic-yearကို တန်းထည့်.
 *
 * အဲ့ conditions တွေနဲ့ @enrollments table မှာ enrollmentIds တွေရ.
 * ရလာတဲ့ enrollmentId တစ်ခုချင်းအတွက် ရခဲ့တဲ့ grades တွေနဲ့ remark (Fail, Pass, Pass with credit) တွေကို @gradings table မှာရှာ.
 * ရလာတဲ့ တစ်နှစ်ချင်းစီ gradings တွေထဲမှာ Fail တဲ့တစ်ဘာသာပါရင် အဲ့နှစ် gradings တစ်ခုလုံးကို ဖြုတ်. (အောင်တဲ့နှစ်ရဲ့ gradings တွေပဲရ.)
 *
 * Option 1
 * @params degree, from-academic-year, to-academic-year နှင့် to-academic-year တွင်တက်ရောက်ခဲ့သော ခုံနံပတ်
 *
 * Option 2
 * @params degree, x-academic-year နှင့် ၎င်းနှစ်တွင် တက်ရောက်ခဲ့သော ခုံနံပတ်
 */
exports.generateGradings = catchAsync(async (req, res) => {
  const degreeId = req.params.degreeId;
  const fromAcademicYearId = req.params.fromAcademicYearId;
  const toAcademicYearId = req.params.toAcademicYearId;
  const rollNo = req.params.rollNo;

  const student = await models.Enrollment.findOne({
    where: {
      degreeId,
      academicYearId: toAcademicYearId,
      rollNo,
    },
    include: [{ model: models.Student, as: "student", attributes: ["nameEn"] }],
    attributes: ["studentId"],
  });

  if (!student)
    return res.status(200).json({
      status: "fail",
      message: "No data!",
    });
  // ok - 1

  const from = parseInt(fromAcademicYearId);
  const to = parseInt(toAcademicYearId);
  let where = {};
  // * option 1 - for for from-academic-year to to-academic-year
  if (from < to) {
    const academicYears = _.range(from, to + 1).map((r) => ({
      academicYearId: r,
    }));
    where = {
      degreeId,
      studentId: student.studentId,
      [Op.or]: academicYears,
    };
  }
  // * option 2 - for x-academic-year
  else if (from === to)
    where = {
      degreeId,
      studentId: student.studentId,
      academicYearId: fromAcademicYearId,
    };
  else
    return res.status(200).json({
      status: "fail",
      message: "Invalid data",
    });

  const enrollments = await models.Enrollment.findAll({
    where,
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
    raw: true,
    nest: true,
  }); // ok - 2

  const promises = enrollments.map(async (enrollment) => {
    const grades = await models.Grading.findAll({
      where: {
        enrollmentId: enrollment.enrollmentId,
      },
      attributes: ["enrollmentId", "gradeId", "remarkId"],
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

    return grades;
  });

  const gradings = await Promise.all(promises); // ok - 3

  let passGradings = gradings.filter((arr) =>
    arr.every((obj) => obj.remark.name !== "Fail")
  );

  return res.status(200).json({
    status: "success",
    data: {
      student,
      enrollments,
      passGradings,
    },
  });
});

/**
--------------------------------------------
Marks
--------------------------------------------
*/
/**
 * @generateMarks generates mark certificate. Generating marks cam be done by 2 options:
 * * 1 - for from-academic-year to to-academic-year -> /degree/1/from/2/to/4/roll-no/4IST-44/all-marks
 * * 2 - for x-academic-year                        -> /degree/1/from/2/to/2/roll-no/3IST-33/all-marks
 *
 * db logic တူတဲ့အတွက် option ၂ ခုလုံးကို method တစ်ခုထဲမှာ ပေါင်းရေးထားပါတယ်. condition ကတော့ မတူတဲ့အတွက် @where object ကိုတော့ condition ပေါ်မူတည်ပြီး ပြောင်းရပါတယ်.
 * from-academic-year နဲ့ to-academic-year နဲ့မှာ to-academic-year က ကြီးရင် option 1 ဖြစ်. တူရင် option 2 ဖြစ်. ငယ်ရင် invalid ဖြစ်.
 *
 * option 1 - က နှစ်-range နဲ့ ထုတ်မှာမလို့ ဝင်လာတဲ့ from/to academic year တွေအရ range array ဆောက်. (e.g. from 2015-2016 to 2019-2020 ဆိုရင် (ကျောင်းစဖွင့်တဲ့ နှစ် 2010-2011 က db မှာ 1 ဆိုတော့) [6, 7, 8, 9, 10] ရ. )
 * 1 - ဝင်လာတဲ့ degreeId,
 * 2 - <to-academic-year နဲ့ to-academic-year မှာတက်ခဲ့တဲ့ rollno> တို့ကိုသုံးပြီး @enrollments table ကနေယူထားတဲ့ studentId,
 * 3 - ဝင်လာတဲ့ from/to academic-year တွေအရ academic-year range array.
 *
 * option 2 - က တစ်နှစ်စာပဲထုတ်မှာမလို့ option 1 က ၃အချက်ရဲ့အောက်ဆုံးအချက်နေရာမှာ ဝင်လာတဲ့x-academic-yearကို တန်းထည့်.
 *
 * အဲ့ conditions တွေနဲ့ @enrollments table မှာ enrollmentIds တွေရ.
 * ရတဲ့ enrollmentIds တွေနဲ့ @gradings table မှာ အမှတ်တွေယူ.
 *
 * * 1 - for from-academic-year to to-academic-year (from 2015-2016 to 2019-2020, 6IST-70)
 * @params degree, from-academic-year, to-academic-year နှင့် to-academic-year တွင်တက်ရောက်ခဲ့သော ခုံနံပတ်
 * ! rollno must be to-academic-year's rollno.
 *
 * * 2 - for x-academic-year
 * @params degree, x-academic-year နှင့် ၎င်းနှစ်တွင် တက်ရောက်ခဲ့သော ခုံနံပတ်
 */
exports.generateMarks = catchAsync(async (req, res) => {
  const degreeId = req.params.degreeId;
  const fromAcademicYearId = req.params.fromAcademicYearId;
  const toAcademicYearId = req.params.toAcademicYearId;
  const rollNo = req.params.rollNo;

  const student = await models.Enrollment.findOne({
    where: {
      degreeId,
      academicYearId: toAcademicYearId,
      rollNo,
    },
    include: [{ model: models.Student, as: "student", attributes: ["nameEn"] }],
    attributes: ["studentId"],
  });

  if (!student)
    return res.status(200).json({
      status: "fail",
      message: "No data!",
    });

  const from = parseInt(fromAcademicYearId);
  const to = parseInt(toAcademicYearId);
  let where = {};
  // * 1 - for for from-academic-year to to-academic-year
  if (from < to) {
    const academicYears = _.range(from, to + 1).map((r) => ({
      academicYearId: r,
    }));
    where = {
      degreeId,
      studentId: student.studentId,
      [Op.or]: academicYears,
    };
  }
  // * 2 - for x-academic-year
  else if (from === to)
    where = {
      degreeId,
      studentId: student.studentId,
      academicYearId: fromAcademicYearId,
    };
  else
    return res.status(200).json({
      status: "fail",
      message: "Invalid data",
    });

  const enrollments = await models.Enrollment.findAll({
    where,
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
    raw: true,
    nest: true,
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

/**
 * @generateApprovalLetter
 * * 1 - attending
 * * 2 - passing
 *
 * @params academicYearId, rollNo, type (attending || passing)
 */
exports.generateApprovalLetter = catchAsync(async (req, res) => {
  const academicYearId = req.params.academicYearId;
  const rollNo = req.params.rollNo;
  const type = req.query.type;

  if (type !== "attending" && type !== "passing")
    return res.status(400).json({
      status: "fail",
      message: "Invalid type to generate.",
    });

  const enrollment = await models.Enrollment.findOne({
    where: {
      academicYearId,
      rollNo,
    },
    attributes: ["enrollmentId"],
  });

  if (enrollment) {
    return res.status(200).json({
      status: "success",
      type,
      message: "The requested values are valid.",
    });
  }
});
