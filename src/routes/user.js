const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/auth');
const users = require('../controllers/users');

router.post('/', users.register);
router.get('/me', authentication, users.getMe);

module.exports = router;
