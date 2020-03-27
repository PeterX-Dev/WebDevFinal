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
        res.render('loginPage' ,{InvalidMemberInfo: true});
    }
}

exports.newMemberSignUp = function(req,res,next) {
    const newUser = req.body;

    if (mod_user.checkNoRepeat(newUser))
    {
        // This is a new user, no repeat user existed in DB
        // Then we check two password is matched or not
        if (newUser.password === undefined || newUser.password.length == 0 ||
            newUser.confirmPwd === undefined || newUser.confirmPwd.length == 0) {
            res.render('loginPage' ,{
                invalidNewUserWarningText: "ERROR: Password is empty!"
            });
        }
        else if (newUser.password != newUser.confirmPwd) 
        {
            res.render('loginPage' ,{
                invalidNewUserWarningText: "ERROR: Password is not matched!"
            });
        }
        else
        {
            // Create new user and save into DB here, otherwise we will not get
            // these information in the next page
            mod_user.add(newUser);

            res.render('signUpPage', {
            });
        }
    }
    else{
        // inValid user, display error message 
        res.render('loginPage' ,{
            invalidNewUserWarningText: "ERROR: User already existed!"
        });
    }
}

exports.signUpComplete = function(req,res,next) {
    let userExtraInfo = req.body;

    // update user info into DB
    mod_user.update(userExtraInfo);
    res.render('loginPage' ,{      
    });
}
