const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/myPost', postController.showMyPostPage);

router.get('/othersPost', postController.showOthersPostPage);

module.exports = router;