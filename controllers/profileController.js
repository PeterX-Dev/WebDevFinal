const mod_user = require('../models/userData');

exports.showProfilePage = async function(req,res,next) {  
    let replyObj = req.body
    
    // TBD-Peter: Need to get profile infomation of current user and display 
    // them in profile edit page. 
    let userObj = await mod_user.getByid(req.session.userId);
    console.log(userObj);

    let d1= new Date(userObj.dob);
    console.log(d1);
   
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

exports.showMemberProfile = async function(req,res,next) {  
    let member_id = req.params.id;
    let user = await mod_user.getByid(member_id);
    res.render('othersPostPage' ,{ user });
}
