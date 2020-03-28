const mod_user = require('../models/userData');

exports.showProfilePage = function(req,res,next) {  
    let replyObj = req.body
    
    // TBD-Peter: Need to get profile infomation of current user and display 
    // them in profile edit page. 
    
    res.render('profileEditPage' ,{      
    });
}

exports.updateProfilePage = function(req,res,next) {  
    let userProfileInfo = req.body
    
    //TBD-Peter:  Need to use session to send user id info to update function

    mod_user.update(userProfileInfo);
    res.render('mainPage' ,{      
    });
}

