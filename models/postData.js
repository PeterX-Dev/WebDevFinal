/* Discussion object define */
// discussionObj = {
//     id (Number) Primary Key
//     Subject (String)
//     Topic(String)      
// }
let db = require('../DB/db');

// Save data locally to reduce frequency of accessing database
// Only when data is updated, we will update the three lists
let topicList = [];
let postList = [];
let commentList = [];

async function addPost(e) {
    let rawPostList;

    if (topicList.length == 0) {
        let rawTopicList = await db.query('SELECT * from public.topic');
        topicList = rawTopicList.rows;
    }

    if (postList.length == 0) {
        rawPostList = await db.query('SELECT * from public.post');
        postList = rawPostList.rows;
    }

    let topicObj = topicList.filter(x => x.name === e.topic);
    if (topicObj !== undefined && topicObj.length !== 0) {
        e.topicId = topicObj[0].id;
    }

    let date = new Date(); 
    // await db.query("Insert into post(member_id_fkey, post_string, date, topic_id_fkey, subject_line) VALUES ("
    //             + Number(e.memberId) + ", '" + e.contents + "', '" + date + "', " + Number(e.topicId) + ", '" + e.subject + "')");
    await db.query("Insert into post(member_id_fkey, post_string, topic_id_fkey, subject_line) VALUES ("
    + Number(e.memberId) + ", '" + e.contents + "', " + Number(e.topicId) + ", '" + e.subject + "')");
    
    // re-read postList after update
    rawPostList = await db.query('SELECT * from public.post');
    postList = rawPostList.rows;

    // console.log(postList);
}

async function getPostsByTime(page) {
    //get all posts with user images and topic info
    let queryString = "SELECT post.id, post.subject_line, post.post_string, post.date, topic.name as \"topic_name\", member.id as \"member_id\", member.image_url \
                       from public.post \
                       left join public.topic on post.topic_id_fkey = topic.id \
                       left join public.member on post.member_id_fkey = member.id";
    let postsData = await db.query(queryString);

    //for each of the post, get all its comments with user images


    
    //get all comments with user images
    queryString = "select comments.id, comments.comment_string, comments.post_id_fkey, member.id as \"member_id\", member.image_url \
                    from public.comments \
                    left join public.member on comments.member_id_fkey = member.id;"
    let commentsData = await db.query(queryString);
    let combinedData = postsData.rows.map((post) => {
        let comments = commentsData.rows.filter((comment) => comment.post_id_fkey == post.id);
        return { post, comments, replies: comments.length }
    })
    return combinedData;
}

function getPost(id) {
    return postList[id];
}

async function getPostsByUser(user_id) {
    if (postList.length == 0) {
        let rawPostList = await db.query('SELECT * from public.post');
        postList = rawPostList.rows;
    }
    if (commentList.length == 0) {
        let rawCommentList = await db.query('SELECT * from public.comments');
        commentList = rawCommentList.rows;
    }

    let posts = postList.filter(x => x.member_id_fkey === Number(user_id));
    
    let combinedData = posts.map((post) => {
        let comments = commentList.filter((comment) => comment.post_id_fkey == post.id);
        return { post, comments, replies: comments.length }
    })

    return combinedData; 
}

async function addComment(e) {
    var datetime = new Date();
    console.log(e);
    await db.query("Insert into comments(comment_string, member_id_fkey, post_id_fkey) VALUES ('"
        + e.comment_string + "', " + Number(e.member_id_fkey) + ", " + Number(e.post_id_fkey) + ")");
    let rawCommentList = await db.query('SELECT * from public.post');
    let commentList = rawCommentList.rows; 
    
    console.log(commentList);
}

function getComments(id) {
    return db.query('Select * from comments where post_id_fkey =' +id);
}

module.exports = {
    add : addPost,
    getPostsByTime : getPostsByTime,
    getByid: getPost,
    addComment,
    getComments,
    getPostsByUser
}