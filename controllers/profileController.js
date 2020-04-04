const mod_user = require('../models/userData');

exports.showProfilePage = async function(req,res,next) {  
    let userObj = await mod_user.getByid(req.session.userId);

    // This is used to change Date to yyyy-mm-dd
    // i.e. 2020-04-09T07:00:00.000Z to 2020-04-09
    let d1= new Date(userObj.dob);
    let month = '' + (d1.getMonth() + 1),
    day = '' + d1.getDate(),
    year = d1.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    userObj.dob = [year, month, day].join('-');
   
    res.render('profileEditPage' ,{
        user: userObj,
        profileEditCSS: true   
    });
}

exports.updateProfilePage = async function(req,res,next) {  
    let userProfileInfo = req.body;

    // use session to get user id info and update function
    userProfileInfo.userId = req.session.userId;
    
    // TBD: Check if password = confirmPwd later when time available

    await mod_user.update(userProfileInfo, true);
    res.redirect('/main');
}

exports.showMemberProfile = async function(req,res,next) {  
    let member_id = req.params.id;
    let user = await mod_user.getByid(member_id);
    res.render('othersPostPage' ,{ user });
}

exports.addLikesProfile = function(req,res,next) {
    console.log("Add likes here"); 

    console.log(req.query);
}
