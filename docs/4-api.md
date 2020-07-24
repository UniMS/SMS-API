# Api Documentation

## Enrollment

### Basic CRUD routes

| NO. | Method | Routes                                    | Description                        |
| --- | ------ | ----------------------------------------- | ---------------------------------- |
| 1   | GET    | `/students`                               | get all students                   |
| 2   | POST   | `/students`                               | create a new student               |
| 3   | POST   | `/students/csv`                           | create bulks students via csv      |
| 4   | GET    | `/students/:studentId`                    | get a student                      |
| 5   | PUT    | `/students/:studentId`                    | update a student                   |
| 6   | DELETE | `/students/:studentId`                    | delete a student                   |
| 7   | GET    | `/students/:studentId/parents`            | get a student's parent             |
| 8   | GET    | `/students/:studentId/attendance-history` | get a student's attendance history |

### Filter

| NO. | Method | Routes                                           | Description                                                    |
| --- | ------ | ------------------------------------------------ | -------------------------------------------------------------- |
| 8   | GET    | `/students/:academicYear/:major/:attendanceYear` | get students by `academic-year`, `major` and `attendance-year` |

### Search

| NO. | Method | Routes                                                   | Description                                    |
| --- | ------ | -------------------------------------------------------- | ---------------------------------------------- |
| 9   | GET    | `/students/:academicYear/:major/:attendanceYear/:rollNo` | Search a student by `roll-no`, eg. 83          |
| 10  | GET    | `/students/:academicYear/:rollNo`                        | Search a student by `roll-no`, eg. 1ICT-83     |
| 11  | GET    | `/students/:serialNo`                                    | Search a student by id `serial-no`, eg. 103984 |
