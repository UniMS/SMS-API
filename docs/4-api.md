# APIs

## User

### Basic CRUD routes

| NO. | Method | Routes           | Description            |
| --- | ------ | ---------------- | ---------------------- |
| 1   | GET    | `/users`         | Get all users          |
| 2   | POST   | `/users`         | Add new user           |
| 3   | POST   | `/users/login`   | Check user credentials |
| 4   | GET    | `/users/:userId` | Get user by ID         |
| 5   | PUT    | `/users/:userId` | Update user by ID      |
| 6   | DELETE | `/users/:userId` | Delete user by ID      |

## Enrollment

### Basic CRUD routes

| NO. | Method | Routes                                    | Description                        |
| --- | ------ | ----------------------------------------- | ---------------------------------- |
| 1   | GET    | `/students`                               | Get all students                   |
| 2   | POST   | `/students`                               | Create a new student               |
| 3   | POST   | `/students/csv`                           | Create bulks students with csv     |
| 4   | GET    | `/students/:studentId`                    | Get a student                      |
| 5   | PUT    | `/students/:studentId`                    | Update a student                   |
| 6   | DELETE | `/students/:studentId`                    | Delete a student                   |
| 7   | GET    | `/students/:studentId/parents`            | Get a student's parent             |
| 8   | GET    | `/students/:studentId/attendance-history` | Get a student's attendance history |

### Filter

| NO. | Method | Routes                                                                                     | Description                                                       | Remark |
| --- | ------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------ |
| 9   | GET    | `/students/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId` | Filter students by `academic-year`, `major` and `attendance-year` | ✔      |

### Search

| NO. | Method | Routes                                                                                             | Description                                          | Remark |
| --- | ------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------ |
| 10  | GET    | `/students/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/:name`   | Search a student by `name`, eg. Mg Mg                | ✔      |
| 11  | GET    | `/students/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/:rollNo` | Search a student by `roll-no`, eg. 83                | ✔      |
| 12  | GET    | `/students/academic-year/:academicYearId/:rollNo`                                                  | Search a student by `roll-no`, eg. 1ICT-83           | ✔      |
| 13  | GET    | `/students/entrance-no/:entranceNo`                                                                | Search a student by id `uni-entrance-no`, eg. 103984 | ✔      |
| 14  | GET    | `/students/nrc/:nrc`                                                                               | Search a student by `nrc`                            | ✔      |

## Exam Result

### Basic CRUD routes

| NO. | Method | Routes                        | Description                        |
| --- | ------ | ----------------------------- | ---------------------------------- |
| 15  | GET    | `/exam-results`               | Get all exam results               |
| 16  | POST   | `/exam-results/csv`           | Create bulks exam results with csv |
| 17  | GET    | `/exam-results/:examResultId` | Get an exam result                 |
| 18  | PUT    | `/exam-results/:examResultId` | Update an exam result              |
| 19  | DELETE | `/exam-results/:examResultId` | Delete an exam result              |

### Filter

| NO. | Method | Routes                                                                                                        | Description                                                                     |
| --- | ------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 20  | GET    | `/exam-results/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId`                | Filter exam results by `academic-year`, `major` and `attendance-year`           |
| 21  | GET    | `/exam-results/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/remark/:remark` | Filter exam-results by `academic-year`, `major`, `attendance-year` and `remark` |

## Search

| NO. | Method | Routes                                                                                                 | Description                                              | Remark |
| --- | ------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ------ |
| 22  | GET    | `/exam-results/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/:rollNo` | Search a student's exam result by `roll-no`, eg. 83      | ✔      |
| 23  | GET    | `/exam-results/academic-year/:academicYearId/roll-no/:rollNo`                                          | Search a student's exam result by `roll-no`, eg. 1ICT-83 | ✔      |

## Grading

### Basic CRUD routes

| NO. | Method | Routes                 | Description                    |
| --- | ------ | ---------------------- | ------------------------------ |
| 24  | GET    | `/gradings`            | Get all gradings               |
| 25  | POST   | `/gradings/csv`        | Create bulks gradings with csv |
| 26  | GET    | `/gradings/:gradingId` | Get a grading                  |
| 27  | PUT    | `/gradings/:gradingId` | Update a grading               |
| 28  | DELETE | `/gradings/:gradingId` | Delete a grading               |

### Filter

| NO. | Method | Routes                                                                                                    | Description                                                                 |
| --- | ------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 19  | GET    | `/gradings/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId`                | Filter gradings by `academic-year`, `major` and `attendance-year`           |
| 30  | GET    | `/gradings/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/remark/:remark` | Filter gradings by `academic-year`, `major`, `attendance-year` and `remark` |

### Search

| NO. | Method | Routes                                                                                             | Description                                          |
| --- | ------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 31  | GET    | `/gradings/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/:name`   | Search a student's grading by `name`, eg. Mg Mg      |
| 32  | GET    | `/gradings/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/:rollNo` | Search a student's grading by `roll-no`, eg. 83      |
| 33  | GET    | `/gradings/academic-year/:academicYearId/roll-no/:rollNo`                                          | Search a student's grading by `roll-no`, eg. 1ICT-83 |
| 34  | GET    | `/gradings/academic-year/:academicYearId/entrance-no/:entranceNo`                                  | Search a student's grading by `uni-entrance-no`      |
| 35  | GET    | `/gradings/nrc/:nrc`                                                                               | Search a student's all gradings by `nrc`             |
| 36  | GET    | `/gradings/entrance-no/:entranceNo`                                                                | Search a student's all gradings by `uni-entrance-no` |
