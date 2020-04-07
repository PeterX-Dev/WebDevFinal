const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/post', postController.showPostPage);

router.post('/post/showComments', postController.showComments);

router.post('/post/addComment', postController.addNewComment);

router.get('/myPost', postController.showMyPostPage);

router.get('/othersPost', postController.showOthersPostPage); //discussion: this page is more then just posts, it's user profile. move to profileController

router.get('/addlikes', postController.addlikesOthersPostPage);

router.post('/post/searchByTitle', postController.searchBySubject);

router.post('/post/searchByTopic', postController.searchByTopic);

module.exports = router;