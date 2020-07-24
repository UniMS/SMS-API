# APIs

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

| NO. | Method | Routes                                           | Description                                                       |
| --- | ------ | ------------------------------------------------ | ----------------------------------------------------------------- |
| 9   | GET    | `/students/:academicYear/:major/:attendanceYear` | Filter students by `academic-year`, `major` and `attendance-year` |

### Search

| NO. | Method | Routes                                                   | Description                                    |
| --- | ------ | -------------------------------------------------------- | ---------------------------------------------- |
| 10  | GET    | `/students/:academicYear/:major/:attendanceYear/:name`   | Search a student by `name`, eg. Mg Mg          |
| 11  | GET    | `/students/:academicYear/:major/:attendanceYear/:rollNo` | Search a student by `roll-no`, eg. 83          |
| 12  | GET    | `/students/:academicYear/:rollNo`                        | Search a student by `roll-no`, eg. 1ICT-83     |
| 13  | GET    | `/students/:serialNo`                                    | Search a student by id `serial-no`, eg. 103984 |
| 14  | GET    | `/students/:nrc`                                         | Search a student by NRC                        |

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

| NO. | Method | Routes                                                       | Description                                                                     |
| --- | ------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| 20  | GET    | `/exam-results/:academicYear/:major/:attendanceYear`         | Filter exam results by `academic-year`, `major` and `attendance-year`           |
| 21  | GET    | `/exam-results/:academicYear/:major/:attendanceYear/:remark` | Filter exam-results by `academic-year`, `major`, `attendance-year` and `remark` |

## Search

| NO. | Method | Routes                                                       | Description                                              |
| --- | ------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| 22  | GET    | `/exam-results/:academicYear/:major/:attendanceYear/:name`   | Search a student's exam result by `name`, eg. Mg Mg      |
| 23  | GET    | `/exam-results/:academicYear/:major/:attendanceYear/:rollNo` | Search a student's exam result by `roll-no`, eg. 83      |
| 24  | GET    | `/exam-results/:academicYear/:rollNo`                        | Search a student's exam result by `roll-no`, eg. 1ICT-83 |

## Grading

### Basic CRUD routes

| NO. | Method | Routes                 | Description                    |
| --- | ------ | ---------------------- | ------------------------------ |
| 25  | GET    | `/gradings`            | Get all gradings               |
| 26  | POST   | `/gradings/csv`        | Create bulks gradings with csv |
| 27  | GET    | `/gradings/:gradingId` | Get a grading                  |
| 28  | PUT    | `/gradings/:gradingId` | Update a grading               |
| 29  | DELETE | `/gradings/:gradingId` | Delete a grading               |

### Filter

| NO. | Method | Routes                                                   | Description                                                                 |
| --- | ------ | -------------------------------------------------------- | --------------------------------------------------------------------------- |
| 30  | GET    | `/gradings/:academicYear/:major/:attendanceYear`         | Filter gradings by `academic-year`, `major` and `attendance-year`           |
| 31  | GET    | `/gradings/:academicYear/:major/:attendanceYear/:remark` | Filter gradings by `academic-year`, `major`, `attendance-year` and `remark` |

### Search

| NO. | Method | Routes                                                   | Description                                          |
| --- | ------ | -------------------------------------------------------- | ---------------------------------------------------- |
| 32  | GET    | `/gradings/:academicYear/:major/:attendanceYear/:name`   | Search a student's grading by `name`, eg. Mg Mg      |
| 33  | GET    | `/gradings/:academicYear/:major/:attendanceYear/:rollNo` | Search a student's grading by `roll-no`, eg. 83      |
| 34  | GET    | `/gradings/:academicYear/:rollNo`                        | Search a student's grading by `roll-no`, eg. 1ICT-83 |
| 35  | GET    | `/gradings/:academicYear/:serialNo`                      | Search a student's grading by `serial-no`            |
| 36  | GET    | `/gradings/:nrc`                                         | Search a student's all gradings by `nrc`             |
| 37  | GET    | `/gradings/:serialNo`                                    | Search a student's all gradings by `serial-no`       |
