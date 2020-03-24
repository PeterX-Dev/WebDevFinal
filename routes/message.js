const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

router.post('/message', messageController.showMessagePage);

router.post('/messageEdit', messageController.showMessageEditPage);

router.post('/messageSend', messageController.sendMessage);

router.post('/message/reply', messageController.newMessageReply);

module.exports = router;