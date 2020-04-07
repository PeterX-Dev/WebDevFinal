var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'knowledgeb4s3@gmail.com',
    pass: `${process.env.GMAIL_PASSWORD}`
  }
});

exports.send = function (receiverName, receiverEmail, senderName, subject, message) {
    var mailOptions = {
        from: 'knowledgeb4s3@gmail.com',
        to: receiverEmail,
        subject: `KnowledgeBase: New message from ${senderName}`,
        text: `Hi ${receiverName}, you just received a new message! \
            \n\n Subject: ${subject} \n \n Message: \n ${message}`
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}