const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/login', loginController.showLoginPage);

router.post('/login/memberLogin', loginController.memberLogin);

router.post('/login/signup', loginController.newMemberSignUp);

router.post('/login/signupComplete', loginController.signUpComplete);

module.exports = router;