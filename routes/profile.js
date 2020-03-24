const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');

router.post('/profile', profileController.showProfilePage);

router.post('/profile/update', profileController.updateProfilePage);

module.exports = router;