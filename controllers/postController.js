let mod = require('../models/postData.js');

exports.showMyPostPage = async function(req,res,next) {  
    let replyObj = req.body;

    let myarr = await mod.getPostsByTime();
    console.log(myarr);

    let userObj = {
        ImageUrl: "https://randomuser.me/api/portraits/med/men/22.jpg",
        FirstName: "John",
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
    let postsData = await mod.getPostsByTime();
    res.render('postPage' ,{postsData, postCSS: true});

}

exports.showComments = function(req,res,next) { 
    let postId = req.body.postId;
    let comments = mod.getCommentsById(postId);
    comments.then((data) => {
        res.render('postPage' ,{ post: mod.getPostsByTime, postId: postId, comments: mod.getCommentsById(postId) });
    })
}

exports.addNewComment = function(req,res,next) {
    //add comment
    let postId = req.body.id;
    let postString = req.body.postString;
    console.log(postId + "  " + postString);
    // res.render('postPage' ,{      
    // });
}

exports.searchBySubject = async function(req,res,next) {
    let searchTerm = req.body.searchTerm;
    let matched = [];
    let matchedPosts = await mod.getPostsBySubject(searchTerm);
    matchedPosts.forEach(async (post, index, arr) => {
        let matchedComments = await mod.getCommentsById(post.id);
        matched.push({ post, comments: matchedComments.rows, replies: matchedComments.rows.length});
        if(Object.is(arr.length-1, index)) {
            res.render('postPage' ,{ postCSS: true, postsData: matched});
        }
    });
}
