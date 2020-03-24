exports.showLoginPage = function(req,res,next) {  
    res.render('loginPage' ,{      
    });
}

exports.memberLogin = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('mainPage' ,{      
    });
}

exports.newMemberSignUp = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('signUpPage' ,{      
    });
}

exports.signUpComplete = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('loginPage' ,{      
    });
}
