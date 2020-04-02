let mod = require('../models/postData.js');

exports.showMyPostPage = async function(req,res,next) {  
    let replyObj = req.body;

    console.log("Show my post page...");
    let myarr = await mod.getall();
    console.log(myarr);

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
            image_url: "https://randomuser.me/api/portraits/med/men/22.jpg",
            subject_line:"Hello2",
            topic_name: "node",
            post_string: "This is a test1 This is a test1 This is a test1 This is a test1 This is a test1",
            date: "Oct 11 2019",
            Replies: 1
        }
    ];

    let userObj = {
        ImageUrl: "https://randomuser.me/api/portraits/med/men/22.jpg",
        FirstName: "user1",
        LastName: "White",
        Description: "Team Lead | Part Time Singer | Full time Mom Canada",
        PostNo: 5,
        MsgNo: 1
    }
    res.render('myPostPage' ,{
        user: userObj,
        posts: myarr,
        postCSS: true,
        myPostCSS: true
    });
}

exports.showOthersPostPage = function(req,res,next) {  
    let replyObj = req.body
    let postList = [
        {
            image_url: "https://randomuser.me/api/portraits/med/women/22.jpg",
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

    let userObj = {
        ImageUrl: "https://randomuser.me/api/portraits/med/women/22.jpg",
        FirstName: "user1",
        LastName: "White",
        Description: "Team Lead | Part Time Singer | Full time Mom Canada",
        PostNo: 5,
        MsgNo: 1
    }

    res.render('othersPostPage' ,{
        user: userObj,
        posts: postList,
        postCSS: true,
        otherPostCSS: true      
    });
}

exports.showPostPage = async function(req,res,next) {  
    let postsData = await mod.getall();
    console.log("controller: " + JSON.stringify(postsData, null, 1));
    res.render('postPage' ,{postsData, postCSS: true});

}

exports.showComments = function(req,res,next) { 
    let postId = req.body.postId;
    let comments = mod.getComments(postId);
    comments.then((data) => {
        res.render('postPage' ,{ post: mod.getall, postId: postId, comments: mod.getComments(postId) });
    })
}

exports.addNewComment = function(req,res,next) {
    //add comment
    // let replyObj = req.body;
    // console.log(replyObj); 
    res.render('postPage' ,{      
    });
}
