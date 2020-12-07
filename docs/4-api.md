# APIs

All searching will be deprecated since we do search in front-end.

## Enrollment

### Basic CRUD routes

| NO. | Method | Routes                                    | Description                        | Ramark |
| --- | ------ | ----------------------------------------- | ---------------------------------- | ------ |
| 1   | GET    | `/students`                               | Get all students                   | 🚧     |
| 2   | POST   | `/students`                               | Create a new student               | 🚧     |
| 3   | POST   | `/students/csv`                           | Create bulks students with csv     | 🚧     |
| 4   | GET    | `/students/:studentId`                    | Get a student                      | ✔      |
| 5   | PUT    | `/students/:studentId`                    | Update a student                   | ✔      |
| 6   | DELETE | `/students/:studentId`                    | Delete a student                   | 🚧     |
| 7   | GET    | `/students/:studentId/parents`            | Get a student's parent             | ✔      |
| 8   | GET    | `/students/:studentId/attendance-history` | Get a student's attendance history | ✔      |
| 9   | PUT    | `/students/:parentId/parent`              | Update parent informtion           | ✔      |

### Filter

| NO. | Method | Routes                                                                                     | Description                                                       | Remark |
| --- | ------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------ |
| 9   | GET    | `/students/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId` | Filter students by `academic-year`, `major` and `attendance-year` | ✔      |

### Search ( **unfinished or canceling** )

| NO. | Method | Routes                                                                                             | Description                                          | Remark |
| --- | ------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------ |
| 10  | GET    | `/students/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/:name`   | Search a student by `name`, eg. Mg Mg                | ✔      |
| 11  | GET    | `/students/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/:rollNo` | Search a student by `roll-no`, eg. 83                | ✔      |
| 12  | GET    | `/students/academic-year/:academicYearId/:rollNo`                                                  | Search a student by `roll-no`, eg. 1ICT-83           | ✔      |
| 13  | GET    | `/students/entrance-no/:entranceNo`                                                                | Search a student by id `uni-entrance-no`, eg. 103984 | ✔      |
| 14  | GET    | `/students/nrc/:nrc`                                                                               | Search a student by `nrc`                            | ✔      |

## Grading

### Basic CRUD routes

| NO. | Method | Routes                                                                                               | Description                    | Remark |
| --- | ------ | ---------------------------------------------------------------------------------------------------- | ------------------------------ | ------ |
| 24  | GET    | `/gradings`                                                                                          | Get all gradings               | 🚧     |
| 25  | POST   | `/gradings/csv`                                                                                      | Create bulks gradings with csv | 🚧     |
| 26  | GET    | `/gradings/:gradingId`                                                                               | Get a grading                  | 🚧     |
| 27  | PUT    | `/gradings/:gradingId`                                                                               | Update a grading               | 🚧     |
| 28  | DELETE | `/gradings/:gradingId`                                                                               | Delete a grading               | 🚧     |
| 29  | GET    | `/gradings/academic-year/:academicYearId/roll-no/:rollNo/gpa`                                        | Get final year GPA             | ✔      |
| 30  | GET    | `/gradings/academic-year/:academicYearId/roll-no/:rollNo/cumulative-gpa`                             | Get Cumulative GPA             | ✔      |
| 31  | GET    | `/gradings/degree/:degreeId/from/:fromAcademicYearId/to/:toAcademicYearId/roll-no/:rollNo`           | Get Grading Document           | ✔      |
| 32  | GET    | `/gradings/degree/:degreeId/from/:fromAcademicYearId/to/:toAcademicYearId/roll-no/:rollNo/all-marks` | Get Mark Certificate           | ✔      |
| 33  | GET    | `/gradings/degree/:degreeId/academic-year/:academicYearId/roll-no/:rollNo/approval`                  | Get Approval Letter            | ✔      |

### Filter

| NO. | Method | Routes                                                                                                    | Description                                                                 | Remark |
| --- | ------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------ |
| 34  | GET    | `/gradings/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId`                | Filter gradings by `academic-year`, `major` and `attendance-year`           | ✔      |
| 30  | GET    | `/gradings/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/remark/:remark` | Filter gradings by `academic-year`, `major`, `attendance-year` and `remark` | 🚧     |

### Search ( **unfinished or canceling** )

| NO. | Method | Routes                                                                                             | Description                                          |
| --- | ------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 31  | GET    | `/gradings/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/:name`   | Search a student's grading by `name`, eg. Mg Mg      |
| 32  | GET    | `/gradings/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/:rollNo` | Search a student's grading by `roll-no`, eg. 83      |
| 33  | GET    | `/gradings/academic-year/:academicYearId/roll-no/:rollNo`                                          | Search a student's grading by `roll-no`, eg. 1ICT-83 |
| 34  | GET    | `/gradings/academic-year/:academicYearId/entrance-no/:entranceNo`                                  | Search a student's grading by `uni-entrance-no`      |
| 35  | GET    | `/gradings/nrc/:nrc`                                                                               | Search a student's all gradings by `nrc`             |
| 36  | GET    | `/gradings/entrance-no/:entranceNo`                                                                | Search a student's all gradings by `uni-entrance-no` |

## Statistics

### Filter ( **New** )

| NO. | Method | Routes                                                                                                    | Description                                     | Remark |
| --- | ------ | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ |
| 1   | GET    | `/statistics/grades/academic-year/:academicYearId/attendance-year/:attendanceYearId/major/:majorId/count` | Get students count by `subject` and `grade`     | ✔      |
| 2   | GET    | `/statistics/academic-year/:academicYearId/pass-fail-rate`                                                | Get Pass,Fail Rate for academic year            | ✔      |
| 3   | GET    | `/statistics/students/count/academic-year/:academicYearId`                                                | Get students count by `academic year`           | ✔      |
| 4   | GET    | `/statistics/students/townships/:townshipId/academic-year/:academicYearId`                                | Get students by `township` and `academic year`  | ✔      |
| 5   | GET    | `/statistics/students/regions/:regionId/academic-year/:academicYearId`                                    | Get students by `region` and `academic year`    | ✔      |
| 6   | GET    | `/statistics/students/religions/:religionId/academic-year/:academicYearId`                                | Get students by `religion` and `academic year`  | ✔      |
| 7   | GET    | `/statistics/students/ethnicity/academic-year/:academicYearId?`                                           | Get students by `ethnicity` and `academic year` | ✔      |
| 5   | GET    | `/statistics/students/gender/:gender/academic-year/:academicYearId`                                       | Get students by `gender` and `academic year`    | ✔      |

## User

### Basic CRUD routes

| NO. | Method | Routes           | Description            | Remark |
| --- | ------ | ---------------- | ---------------------- | ------ |
| 1   | GET    | `/users`         | Get all users          | 🚧     |
| 2   | POST   | `/users`         | Add new user           | ✔      |
| 3   | POST   | `/users/auth`    | Check user credentials | ✔      |
| 4   | GET    | `/users/:userId` | Get user by ID         | 🚧     |
| 5   | PUT    | `/users/:userId` | Update user by ID      | 🚧     |
| 6   | DELETE | `/users/:userId` | Delete user by ID      | 🚧     |
