const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
 
router.get('/profile', profileController.showProfilePage); // can we change this to profile/settings

router.post('/profile/update', profileController.updateProfilePage);

router.get('/profile/:id', profileController.showMemberProfile); //discussion: use this route for viewing other's profile instead

module.exports = router;