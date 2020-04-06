let mod = require('../models/postData.js');
let mod_user = require('../models/userData.js');
let mod_msg = require('../models/messageData');

//TODO: remove duplicate
function formatPosts(postList) {
    let result =  postList.map((each) => {
        if (!each.post) {
            if (!each.date) {
                //date is null, nothing to do
                return each;
            }
            let dateArray = each.date.toDateString().split(" ");
            let formattedDate = "" + dateArray[2] + " " + dateArray[1].toLowerCase() + " " + dateArray[3];
            return {
                ...each,
                date: formattedDate
            }
        } else {
            if (!each.post.date) {
                //date is null, nothing to do
                return each;
            }
            let dateArray = each.post.date.toDateString().split(" ");
            let formattedDate = "" + dateArray[2] + " " + dateArray[1].toLowerCase() + " " + dateArray[3];
            return {
                post: {
                    ...each.post,
                    date: formattedDate
                },
                comments: each.comments,
                replies: each.replies
            }
        }
    });
    return result;
}

exports.showMyPostPage = async function(req,res,next) {  
    let userId = req.session.userId;

    // save this into session
    req.session.currentPage = 'myPost';

    let userObj = await mod_user.getByid(userId);

    let rawPostList = await mod.getPostsByUser(userId);
    let prePostList = formatPosts(rawPostList);

    userObj.PostNo = rawPostList.length;
    userObj.MsgNo = await mod_msg.getCount(userId);
    if (userObj.likes === undefined || userObj.likes === null) 
    {
        userObj.likes = 0;
    }

    let postList=[];
    for (let index = 0; index < prePostList.length; index++) {
        const element = prePostList[index];
        let otherUserObj = await mod_user.getByid(element.post.member_id_fkey);
        element.post.image_url = otherUserObj.image_url;
        let topic = await mod.getTopicNameById(element.post.topic_id_fkey);
        element.post.topic_name = topic.name;

        let myComments = element.comments;
        for (let index1 = 0; index1 < myComments.length; index1++) {
            const comment = myComments[index1];

            let senderObj = await mod_user.getByid(comment.member_id_fkey);
            comment.image_url = senderObj.image_url;           
        }

        postList.push(element);
    }

    res.render('myPostPage' ,{
        user: userObj,
        posts: postList,
        postCSS: true,
        myPostCSS: true
    });
}

exports.showOthersPostPage = async function(req,res,next) { 
    let otherUserId = req.query.userId; 

    // save this into session
    req.session.otherUserId = otherUserId;
    req.session.currentPage = 'othersPost';

    let otherUserObj = await mod_user.getByid(otherUserId);

    let rawPostList = await mod.getPostsByUser(otherUserId);
    let prePostList = formatPosts(rawPostList);

    // console.log(rawPostList);

    otherUserObj.post_count = rawPostList.length;
    otherUserObj.msg_count = await mod_msg.getCount(otherUserId);
    if (otherUserObj.likes_count === undefined || otherUserObj.likes_count === null) 
    {
        otherUserObj.likes_count = 0;
    }

    let postList=[];
    for (let index = 0; index < prePostList.length; index++) {
        const element = prePostList[index];
        let otherUserObj = await mod_user.getByid(element.post.member_id_fkey);
        element.post.image_url = otherUserObj.image_url;
        let topic = await mod.getTopicNameById(element.post.topic_id_fkey);
        element.post.topic_name = topic.name;

        let myComments = element.comments;
        for (let index1 = 0; index1 < myComments.length; index1++) {
            const comment = myComments[index1];

            let senderObj = await mod_user.getByid(comment.member_id_fkey);
            comment.image_url = senderObj.image_url;           
        }

        postList.push(element);
    }

    res.render('othersPostPage' ,{
        user: otherUserObj,
        posts: postList,
        postCSS: true,
        othersPostCSS: true      
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

    // After adding comment, I need to stay in the same page.
    // i.e, when adding from otherpost Page, only need to refreash current page
    console.log(req.session.otherUserId);
    console.log(req.session.currentPage);

    if (req.session.currentPage == 'main' || req.session.currentPage == 'myPost') {
        res.redirect('/' + req.session.currentPage);
    } else if (req.session.currentPage == 'othersPost') {
        res.redirect('/othersPost?userId=' + req.session.otherUserId);
    }
        
//    res.redirect('/'+routeArr[1]);
//    res.redirect('/main');
}

exports.searchBySubject = async function(req,res,next) {
    let searchTerm = req.body.searchTerm;
    let matched = [];
    let rawPosts = await mod.getPostsBySubject(searchTerm);
    console.log(JSON.stringify(rawPosts, null, 1));
    let matchedPosts = formatPosts(rawPosts);
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

exports.addlikesOthersPostPage = async function(req,res,next) {
    console.log("update likes....");

    let userId = req.query.userId;

    console.log(userId);
    await mod_user.updateLikes(userId);

    res.redirect('/othersPost?userId='+userId);
}
