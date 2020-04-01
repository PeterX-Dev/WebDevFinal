const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/post', postController.showPostPage);

router.post('/post/showComments', postController.showComments);

router.post('/post/addComment', postController.addNewComment);

router.get('/myPost', postController.showMyPostPage);

router.get('/othersPost', postController.showOthersPostPage);


module.exports = router;