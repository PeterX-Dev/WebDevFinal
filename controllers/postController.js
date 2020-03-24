exports.showMyPostPage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('myPostPage' ,{      
    });
}

exports.showOthersPostPage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('othersPostPage' ,{      
    });
}

