const express = require('express');
const router = express.Router();

const discussionController = require('../controllers/discussionController');

router.get('/discussion', discussionController.showDiscussionPage);

router.post('/discussion/showReply', discussionController.showReplyPage);

router.post('/discussion/newReply', discussionController.addNewReply);

module.exports = router;