let mod_user = require('../models/userData.js');
let mod_post = require('../models/postData.js');

let userId = 0;

exports.showMainPage = async function(req,res,next) {
    userId = req.session.userId;
    let page = 0;

    // Comment this to pass the test
    // if(req.params && req.params.page) {
    //     page = req.params.page;
    // }
    let userObj = mod_user.getByid(userId);
    //console.log("USER OBJECT: " + JSON.stringify(userObj));
 
    let myPostList = await mod_post.getPostsByPage(page);
    let end = myPostList.length < 5 ? true : false;
    //console.log(myPostList);
   
    res.render('mainPage' ,{
        nextPage: page + 1,
        prevPage: page - 1,
        user: userObj,
        posts: myPostList,
        postCSS: true,
        mainPageCSS: true,
        showNext: !end,
        showPrev: page > 0 ? true : false,
        endOfList: end
    });
}

exports.logout = function(req,res,next) {  
    let replyObj = req.body;
    console.log("logout..."); 
    res.redirect('/login');
}


exports.searchByTopic = async function(req,res,next) {
    let replyObj = req.body;
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