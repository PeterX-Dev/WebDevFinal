exports.showProfilePage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('profilePage' ,{      
    });
}

exports.updateProfilePage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('mainPage' ,{      
    });
}

