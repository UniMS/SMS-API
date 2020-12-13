const student = require('../routes/student');
const grading = require('../routes/grading');
const statistic = require('../routes/statistic');
const user = require('../routes/user');
const auth = require('../routes/auth');
const authentication = require('../middlewares/auth');
const official = require('../middlewares/official');

module.exports = function (app) {
  app.use('/api/users', user);
  app.use('/api/auth', auth);
  app.use('/api/students', authentication, student);
  app.use('/api/gradings', authentication, grading);
  app.use('/api/statistics', authentication, official, statistic);
  app.all('*', (req, res, next) => next(new Error(`Undefined Route!`)));
};
