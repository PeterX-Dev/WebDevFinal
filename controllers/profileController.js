const mod_user = require('../models/userData');

exports.showProfilePage = function(req,res,next) {  
    let replyObj = req.body
    
    // TBD-Peter: Need to get profile infomation of current user and display 
    // them in profile edit page. 
    let userObj = mod_user.getByid(req.session.userId);
    console.log(userObj);
   
    res.render('profileEditPage' ,{
        user: userObj,
        profileEditCSS: true   
    });
}

exports.updateProfilePage = function(req,res,next) {  
    let userProfileInfo = req.body
    
    //TBD-Peter:  Need to use session to send user id info to update function

    mod_user.update(userProfileInfo);
    res.render('mainPage' ,{      
    });
}

