let mod = require('../models/commentData.js');
let mod_user = require('../models/userData.js');

exports.showMainPage = function(req,res,next) {
    let userId = req.session.userId;
    console.log("userid: "+userId);

    // let userObj = {
    //     ImageUrl: "https://randomuser.me/api/portraits/med/men/22.jpg",
    //     FirstName: "user1",
    //     LastName: "White",
    //     Description: "This is a test from somewhere"
    // }
    let userObj = mod_user.getByid(userId);
    console.log(userObj);
 
    let postList = [
        {
            image_url: "https://randomuser.me/api/portraits/med/men/22.jpg",
            subject_line:"Hello1",
            topic_name: "php",
            post_string: "This is a test0 This is a test0 This is a test0 This is a test0 This is a test0",
            date: "Oct 10 2019",
            Replies: 5
        },
        {
            image_url: "https://randomuser.me/api/portraits/med/women/22.jpg",
            subject_line:"Hello2",
            topic_name: "node",
            post_string: "This is a test1 This is a test1 This is a test1 This is a test1 This is a test1",
            date: "Oct 11 2019",
            Replies: 1
        }
    ];

    
    res.render('mainPage' ,{
        user: userObj,
        posts: postList,
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

exports.postToTimeLine = function(req,res,next) {
    let replyObj = req.body;
    console.log(replyObj); 

    // Updating related data ...

    res.render('mainPage' ,{      
    });
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