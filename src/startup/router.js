const authentication = require('../middlewares/auth');
const official = require('../middlewares/official');
const student = require('../routes/student');
const grading = require('../routes/grading');
const statistic = require('../routes/statistic');
const user = require('../routes/user');
const auth = require('../routes/auth');

module.exports = function (app) {
  /**
   * * Auth Routes
   * ! ORDER matters
   */
  app.use('/api/users', user);
  app.use('/api/auth', auth);
  app.use(authentication); // <- enable when all business logic are done.

  /**
   * * System Related Routes
   */
  app.use('/api/students', student);
  app.use('/api/gradings', grading);

  app.use(official); // <- enable when all statistics implementations are done.
  app.use('/api/statistics', statistic);

  app.all('*', (req, res, next) => {
    return res.status(404).json({
      status: 'fail',
      message: 'Undefined routee!',
    });
  });
};
