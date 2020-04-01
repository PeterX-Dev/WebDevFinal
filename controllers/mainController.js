let mod = require('../models/commentData.js');
exports.showMainPage = function(req,res,next) {
    let name = req.session.userId;
    console.log("userid: "+name);
 
    let postList = [
        {
            ImageUrl: "https://randomuser.me/api/portraits/med/men/22.jpg",
            Subject:"Hello1",
            Topic: "php",
            Message: "This is a test0 This is a test0 This is a test0 This is a test0 This is a test0",
            Date: "Oct 10 2019",
            Replies: 5
        },
        {
            ImageUrl: "https://randomuser.me/api/portraits/med/women/22.jpg",
            Subject:"Hello2",
            Topic: "node",
            Message: "This is a test1 This is a test1 This is a test1 This is a test1 This is a test1",
            Date: "Oct 11 2019",
            Replies: 1
        }
    ];

    res.render('mainPage' ,{
        posts: postList,
        postCSS: true
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