let mod = require('../models/postData.js');
let mod_user = require('../models/userData.js');

exports.showMyPostPage = async function(req,res,next) {  
    let userId = req.session.userId;

    let userObj = await mod_user.getByid(userId);

    let prePostList = await mod.getPostsByUser(userId);
    let postList = prePostList.map((element) => {
        let otherUserObj = mod_user.getByid(element.post.member_id_fkey);
        element.post.image_url = otherUserObj.image_url;
        return element;
    })

    res.render('myPostPage' ,{
        user: userObj,
        posts: postList,
        postCSS: true,
        myPostCSS: true
    });
}

exports.showOthersPostPage = async function(req,res,next) {  
    let otherUserId = req.query.userId; 

    let otherUserObj = await mod_user.getByid(otherUserId);

    let prePostList = await mod.getPostsByUser(otherUserId);
    let postList = prePostList.map((element) => {
        let otherUserObj = mod_user.getByid(element.post.member_id_fkey);
        element.post.image_url = otherUserObj.image_url;
        return element;
    })

    res.render('othersPostPage' ,{
        user: otherUserObj,
        posts: postList,
        postCSS: true,
        otherPostCSS: true      
    });
}

exports.showPostPage = async function(req,res,next) {  
    let postsData = await mod.getPostsByPage();
    res.render('postPage' ,{postsData, postCSS: true});

}

exports.showComments = function(req,res,next) { 
    let postId = req.body.postId;
    let comments = mod.getCommentsById(postId);
    comments.then((data) => {
        res.render('postPage' ,{ post: mod.getPostsByPage, postId: postId, comments: mod.getCommentsById(postId) });
    })
}

exports.addNewComment = async function(req,res,next) {
    let newComment = {};
    newComment.comment_string = req.body.postString;
    newComment.member_id_fkey = req.session.userId;
    newComment.post_id_fkey = req.body.id;
    
    await mod.addComment(newComment);
    
    console.log("Add comment successful");
    res.redirect('/main/:page');
}

exports.searchBySubject = async function(req,res,next) {
    let searchTerm = req.body.searchTerm;
    let matched = [];
    let matchedPosts = await mod.getPostsBySubject(searchTerm);
    if (matchedPosts.length == 0) {
        res.render('postPage' ,{ postCSS: true, postsData: matched, noMatch: true});
    }
    matchedPosts.forEach(async (post, index, arr) => {
        let matchedComments = await mod.getCommentsById(post.id);
        matched.push({ post, comments: matchedComments.rows, replies: matchedComments.rows.length});
        if(Object.is(arr.length-1, index)) {
            res.render('postPage' ,{ postCSS: true, postsData: matched});
        }
    });
}
