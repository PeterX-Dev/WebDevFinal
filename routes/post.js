const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/myPost', postController.showMyPostPage);

router.post('/othersPost', postController.showOthersPostPage);

module.exports = router;