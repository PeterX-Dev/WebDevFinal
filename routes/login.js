const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/login/memberLogin', loginController.memberLogin);

router.post('/login/signup', loginController.newMemberSignUp);

router.post('/login/signupComplete', loginController.signUpComplete);

router.get('/login', loginController.showLoginPage);


module.exports = router;