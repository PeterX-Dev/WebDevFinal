const mod_user = require('../models/userData');
const mod_discuss = require('../models/discussionData');
const mod_post = require('../models/postData');

exports.showLoginPage = function(req,res,next) {  
    // Display empty login Page
    res.render('loginPage' ,{      
    });
}

exports.memberLogin = function(req,res,next) {  
    const loginUser = req.body;
    let userId;

    if ((userId = mod_user.checkValidity(loginUser)) >= 0) 
    {
        // valid member
        res.render('mainPage' ,{
        });
    }
    else{
        // inValid user, display error message 
        res.render('loginPage' ,{InvalidMember: true});
    }


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
