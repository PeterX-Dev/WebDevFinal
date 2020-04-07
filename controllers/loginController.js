const mod_user = require('../models/userData');
const mod_post = require('../models/postData');

exports.showLoginPage = async function(req,res,next) {  
    // Display empty login Page
    res.render('loginPage' ,{loginCSS: true});

//    await mod_user.update({});
}

exports.memberLogin = async function(req,res,next) {  
    const loginUser = req.body;
    let userId;

    if ((userId = await mod_user.checkValidity(loginUser)) >= 0) 
    {
        // valid member
        // Need to redirect to '/' in order to set session, not main here!! 
        res.redirect('/?userId='+userId);
    }
    else{
        // inValid user, display error message 
        res.render('loginPage' ,{
            InvalidMemberInfo: true,
            loginCSS: true
        });
    }
}

exports.newMemberSignUp = async function(req,res,next) {
    const newUser = req.body;

    if (await mod_user.checkNoRepeat(newUser))
    {
        // This is a new user, no repeat user existed in DB
        // Then we check two password is matched or not
        if (newUser.password === undefined || newUser.password.length == 0 ||
            newUser.confirmPwd === undefined || newUser.confirmPwd.length == 0) {
            res.render('loginPage' ,{
                invalidNewUserWarningText: "ERROR: Password is empty!",
                loginCSS: true
            });
        }
        else if (newUser.password != newUser.confirmPwd) 
        {
            res.render('loginPage' ,{
                invalidNewUserWarningText: "ERROR: Passwords do not match!",
                loginCSS: true
            });
        }
        else
        {
            // pass in info to next signup page to complete registration
            res.render('signUpPage', {
                pwd: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            })
        }
    }
    else{
        // inValid user, display error message 
        res.render('loginPage' ,{
            invalidNewUserWarningText: "ERROR: User already existed!",
            loginCSS: true
        });
    }
}

exports.addExtraInfo = async function(req,res,next) {
    let userId = req.query.userId; 
    //console.log(userId);

    res.render('signUpPage', {
        userId: userId,
        signupCSS: true,
        loginCSS: true
    });
}

exports.signUpComplete = async function(req,res,next) {
    let newUser = req.body;
    
    //console.log(userExtraInfo);
    //TBD-Peter:  Need to use session to send user id info to update function

    // add user info into DB
    await mod_user.add(newUser);

    // add view/toast/new page that says sign successful, please login.
    
    
    res.render('loginPage' ,{ 
        loginCSS: true,
        newUserSignupSuccess: true    
    });
}
