let mod_user = require('../models/userData.js');
let mod_post = require('../models/postData.js');
let mod_msg = require('../models/messageData');

let userId = 0;

//TODO: remove duplicate
//TODO: remove duplicate
function formatPosts(postList) {
    let result =  postList.map((each) => {
        if (!each.post) {
            if (!each.date) {
                //date is null, nothing to do
                return each;
            }
            let dateArray = each.date.toDateString().split(" ");
            let formattedDate = "" + dateArray[2] + dateArray[1].toLowerCase() + dateArray[3];
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
            let formattedDate = "" + dateArray[2] + dateArray[1].toLowerCase() + dateArray[3];
            return {
                post: {
                    ...each.post,
                    date: formattedDate
                },
                comments: each.comments
            }
        }
    });
    return result;
}

exports.showMainPage = async function(req,res,next) {
    userId = req.session.userId;
    console.log("USER: " + userId);
    let page = 0;
    if(req && req.params && req.params.page) {
        page = req.params.page;
    }
    let userObj = await mod_user.getByid(userId);
    //console.log("USER OBJECT: " + JSON.stringify(userObj));

    let myPostList = await mod_post.getPostsByUser(userId);
    userObj.PostNo = myPostList.length;
    userObj.MsgNo = await mod_msg.getCount(userId);
    if (userObj.likes === undefined || userObj.likes.length == 0) 
    {
        userObj.likes = 0;
    }
 
    let rawPostList = await mod_post.getPostsByPage(page);
    myPostList = formatPosts(rawPostList);
    let end = myPostList.length < 5 ? true : false;

    // TBD-Peter: Calculate post_count, msg_count and likes_count from DB
    // userObj.post_count = ??
    // userObj.msg_count = ??

    res.render('mainPage' ,{
        nextPage: page + 1,
        prevPage: page - 1,
        user: userObj, //discussion can remove? not used in page
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
    let topicId = req.body.topic;
    let matched = [];
    let rawPosts = await mod_post.getPostsByTopic(topicId);
    if (rawPosts.length == 0) {
        res.render('postPage' ,{ postCSS: true, postsData: matched, noMatch: true});
    }
    let matchedPosts = formatPosts(rawPosts);
    matchedPosts.forEach(async (post, index, arr) => {
        let matchedComments = await mod_post.getCommentsById(post.id);
        matched.push({ post, comments: matchedComments.rows, replies: matchedComments.rows.length});
        if(Object.is(arr.length-1, index)) {
            res.render('postPage' ,{ postCSS: true, postsData: matched});
        }
    });
}

exports.postToTimeLine = async function(req,res,next) {
    let newPost = req.body;
    // console.log(JSON.stringify(req, null, 1)); 

    // Updating related data ...
    newPost.memberId = userId;
    let postId = await mod_post.add(newPost);

    res.redirect('/main');
}