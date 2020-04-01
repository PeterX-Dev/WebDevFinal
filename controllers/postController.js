let mod = require('../models/postData.js');

exports.showMyPostPage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('myPostPage' ,{      
    });
}

exports.showOthersPostPage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('othersPostPage' ,{      
    });
}

exports.showPostPage = async function(req,res,next) {  
    let postsData = await mod.getall();
    console.log("controller: " + postsData);
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
