exports.showDiscussionPage = function(req,res,next) {  
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
