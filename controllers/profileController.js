exports.showProfilePage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('profileEditPage' ,{      
    });
}

exports.updateProfilePage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('mainPage' ,{      
    });
}

