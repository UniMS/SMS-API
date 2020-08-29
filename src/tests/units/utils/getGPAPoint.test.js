const getGPAPoint = require('../../../utils/getGPAPoint');

describe('getGPAPoint', () => {
  it('should return 5 if the grade is A+ or A', () => {
    const grades = ['A+', 'A'];
    grades.forEach((grade) => {
      const point = getGPAPoint(grade);
      expect(point).toBe(5);
    });
  });

  it('should return 4.5 if the grade is A- or B+', () => {
    const grades = ['A-', 'B+'];
    grades.forEach((grade) => {
      const point = getGPAPoint(grade);
      expect(point).toBe(4.5);
    });
  });

  it('should return 4 if the grade is B', () => {
    const point = getGPAPoint('B');
    expect(point).toBe(4);
  });

  it('should return 3.5 if the grade is B- or C+', () => {
    const grades = ['B-', 'C+'];
    grades.forEach((grade) => {
      const point = getGPAPoint(grade);
      expect(point).toBe(3.5);
    });
  });

  it('should return 3 if the grade is C', () => {
    const point = getGPAPoint('C');
    expect(point).toBe(3);
  });

  it('should return 2.5 if the grade is C-', () => {
    const point = getGPAPoint('C-');
    expect(point).toBe(2.5);
  });
});
