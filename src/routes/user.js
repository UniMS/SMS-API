const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const users = require('../controllers/users');

router.post('/', users.register);
router.get('/me', auth, users.getMe);

module.exports = router;
