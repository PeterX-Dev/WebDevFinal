const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/main', mainController.showMainPage);

router.get('/logout', mainController.logout); 

router.post('/main/searchByTitle', mainController.searchByTitle);

router.post('/main/searchByTopic', mainController.searchByTopic);

router.post('/main/postToTimeLine', mainController.postToTimeLine);

router.post('/main/next', mainController.next);
router.post('/main/prev', mainController.prev);

module.exports = router;