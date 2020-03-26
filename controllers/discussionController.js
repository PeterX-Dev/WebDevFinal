let db = require('../DB/db');

exports.showDiscussionPage = function(req,res,next) {  
    db.query("Insert into Post (content) VALUES ('second time!')");
    console.log("added to db");
    res.render('discussionPage' ,{      
    });
}

exports.showReplyPage = function(req,res,next) {  
    res.render('replyPage' ,{      
    });
}

exports.addNewReply = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('replyPage' ,{      
    });
}
