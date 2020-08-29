const calculateFinalYearGPA = require('../../../utils/calculateFinalYearGPA');

describe('calculateFinalYearGPA', () => {
  it('should throw an exception if input is not an array', () => {
    const inputs = [1, 'a', null, undefined, {}];
    inputs.forEach((i) => {
      expect(() => {
        calculateFinalYearGPA(i);
      }).toThrow();
    });
  });

  it('should return 4.0 if inputs are A, B and C', () => {
    const gradings = [
      {
        grading: {
          gradeId: 2,
          grade: {
            gradeId: 2,
            name: 'A',
          },
        },
      },
      {
        grading: {
          gradeId: 5,
          grade: {
            gradeId: 5,
            name: 'B',
          },
        },
      },
      {
        grading: {
          gradeId: 8,
          grade: {
            gradeId: 8,
            name: 'C',
          },
        },
      },
    ];
    const result = calculateFinalYearGPA(gradings);
    expect(result).toBe(4.0);
  });

  it('should return 3.7 if inputs are A-, C+ and C', () => {
    const gradings = [
      {
        grading: {
          gradeId: 3,
          grade: {
            gradeId: 3,
            name: 'A-',
          },
        },
      },
      {
        grading: {
          gradeId: 7,
          grade: {
            gradeId: 7,
            name: 'C+',
          },
        },
      },
      {
        grading: {
          gradeId: 8,
          grade: {
            gradeId: 8,
            name: 'C',
          },
        },
      },
    ];
    const result = calculateFinalYearGPA(gradings);
    expect(result).toBe(3.7);
  });
});
