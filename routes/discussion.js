const express = require('express');
const router = express.Router();

const discussionController = require('../controllers/discussionController');

router.get('/discussion', discussionController.showDiscussionPage);

router.post('/discussion/showComments', discussionController.showComments);

router.post('/discussion/newComments', discussionController.addNewComment);

module.exports = router;