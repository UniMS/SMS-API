module.exports = function (grade) {
  let point = 0;
  if (grade === 'A+' || grade === 'A') point = 5;
  else if (grade === 'A-' || grade === 'B+') point = 4.5;
  else if (grade === 'B') point = 4;
  else if (grade === 'B-' || grade === 'C+') point = 3.5;
  else if (grade === 'C') point = 3;
  else if (grade === 'C-') point = 2.5;

  return point;
};
