let db = require('../DB/db');
let mod_user = require('../models/discussionData.js');

exports.showDiscussionPage = function(req,res,next) {  
    // db.query("Insert into Post (content) VALUES ('second time!')");
    // console.log("added to db");
    res.render('discussionPage' ,{discussion: mod_user.getall, discussionCSS: true});
}

exports.showComments = function(req,res,next) {  
    //expand to show replies
    res.render('replyPage' ,{      
    });
}

exports.addNewReply = function(req,res,next) {
    //add comment
    let replyObj = req.body
    console.log(replyObj); 
    res.render('replyPage' ,{      
    });
}
