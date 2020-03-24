exports.showMessagePage = function(req,res,next) {  
    res.render('messagePage' ,{      
    });
}

exports.showMessageEditPage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('messageEditPage' ,{      
    });
}

exports.sendMessage = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('othersPostPage' ,{      
    });
}

exports.newMessageReply = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('messagePage' ,{      
    });
}