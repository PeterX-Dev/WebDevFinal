let mod_user = require('../models/userData.js');
let mod_post = require('../models/postData.js');

let userId = 0;

exports.showMainPage = async function(req,res,next) {
    userId = req.session.userId;

    let userObj = mod_user.getByid(userId);
    console.log(userObj);
 
    let myPostList = await mod_post.getall();
    console.log(myPostList);
   
    res.render('mainPage' ,{
        user: userObj,
        posts: myPostList,
        postCSS: true,
        mainPageCSS: true
    });
}

exports.logout = function(req,res,next) {  
    let replyObj = req.body;
    console.log(replyObj); 
    res.render('loginPage' ,{      
    });
}

exports.searchByTitle = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('postPage' ,{      
    });
}

exports.searchByTopic = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('postPage' ,{      
    });
}

exports.postToTimeLine = async function(req,res,next) {
    let newPost = req.body;
    console.log(newPost); 

    // Updating related data ...
    newPost.memberId = userId;
    let postId = await mod_post.add(newPost);

    res.redirect('/main');
}

exports.next = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 

    // Updating discussion and post data to be displayed 

    res.render('mainPage' ,{      
    });
}

exports.prev = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 

    // Updating discussion and post data to be displayed 

    res.render('mainPage' ,{      
    });
}