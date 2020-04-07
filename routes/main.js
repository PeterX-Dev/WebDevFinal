const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const postController = require('../controllers/postController');

router.get('/main', mainController.showMainPage);

// router.get('/main/:page', mainController.showMainPage);

router.get('/logout', mainController.logout); 

router.post('/main/postToTimeLine', mainController.postToTimeLine);

module.exports = router;