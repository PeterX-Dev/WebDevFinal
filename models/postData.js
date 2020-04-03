/* Discussion object define */
// discussionObj = {
//     id (Number) Primary Key
//     Subject (String)
//     Topic(String)      
// }
let db = require('../DB/db');

let topicList = [];
let postList = [];

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

async function getAllPosts() {
    //get all posts with user images and topic info
    let queryString = "SELECT post.id, post.subject_line, post.post_string, post.date, topic.name as \"topic_name\", member.id as \"member_id\", member.image_url \
                       from public.post \
                       left join public.topic on post.topic_id_fkey = topic.id \
                       left join public.member on post.member_id_fkey = member.id";
    let postsData = await db.query(queryString);

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

function addComment(e) {

}

function getComments(id) {
    return db.query('Select * from comment where post_id_fkey =' +id);
}

module.exports = {
    add : addPost,
    getall : getAllPosts,
    getByid: getPost,
    addComment,
    getComments
}