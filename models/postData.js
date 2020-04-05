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

    let now= new Date(); 

    const insertText = 'INSERT INTO post(member_id_fkey, post_string, date, topic_id_fkey, subject_line) VALUES ($1, $2, $3, $4, $5)';
    await db.query(insertText, [Number(e.memberId), e.contents, now, Number(e.topicId), e.subject]);
    
    // re-read postList after update
    rawPostList = await db.query('SELECT * from public.post');
    postList = rawPostList.rows;

    // console.log(postList);
}

async function getPostsByPage(page) {
    let postsPerPage = 5;
    let offset = page * postsPerPage;

    //get all posts with user images and topic info
    let queryString = "SELECT post.id, post.subject_line, post.post_string, post.date, topic.name as \"topic_name\", member.id as \"member_id\", member.image_url \
                       from public.post \
                       left join public.topic on post.topic_id_fkey = topic.id \
                       left join public.member on post.member_id_fkey = member.id \
                       WHERE post.date IS NOT NULL \
                       ORDER BY date DESC \
                       OFFSET " + offset + " ROWS \
                       FETCH NEXT " + postsPerPage + " ROWS ONLY;";
    let postsData = await db.query(queryString);

    
    //get all comments with user images
    queryString = "select comments.id, comments.comment_string, comments.post_id_fkey, member.id as \"member_id\", member.image_url \
                    from public.comments \
                    left join public.member on comments.member_id_fkey = member.id;"
    let commentsData = await db.query(queryString);
    let combinedData = postsData.rows.map((post) => {
        let comments = commentsData.rows.filter((comment) => comment.post_id_fkey == post.id);
        let replies = comments.length;
        return { post, comments, replies }
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
        let replies = comments.length;
        return { post, comments, replies }
    })

    return combinedData; 
}

async function addComment(e) {
    let now= new Date(); 
    
    const insertText = 'INSERT INTO comments(comment_string, member_id_fkey, post_id_fkey, date) VALUES ($1, $2, $3, $4)';
    await db.query(insertText, [e.comment_string, Number(e.member_id_fkey), Number(e.post_id_fkey), now]);

    let rawCommentList = await db.query('SELECT * from public.comments');
    let commentList = rawCommentList.rows; 
    
    console.log(commentList);
}

function getCommentsById(id) {    
    let queryString = "select comments.id, comments.comment_string, comments.post_id_fkey, member.id as \"member_id\", member.image_url \
                    from public.comments \
                    left join public.member on comments.member_id_fkey = member.id \
                    where post_id_fkey = " + id;
    return db.query(queryString);
}

async function getPostsBySubject(searchTerm) {
    //get all posts with user images and topic info
    let queryString = "SELECT post.id, post.subject_line, post.post_string, post.date, topic.name as \"topic_name\", member.id as \"member_id\", member.image_url \
                       from public.post \
                       left join public.topic on post.topic_id_fkey = topic.id \
                       left join public.member on post.member_id_fkey = member.id \
                       WHERE post.subject_line ILIKE " + `'%${searchTerm}%'`;

    let matchedPosts = await db.query(queryString);
    return matchedPosts.rows;

}

async function getPostsByTopic(topicId) {
    //get all posts with user images and topic info
    let queryString = "SELECT post.id, post.subject_line, post.post_string, post.date, topic.name as \"topic_name\", member.id as \"member_id\", member.image_url \
                       from public.post \
                       left join public.topic on post.topic_id_fkey = topic.id \
                       left join public.member on post.member_id_fkey = member.id \
                       WHERE topic.id = " + topicId + " AND post.date IS NOT NULL";

    let matchedPosts = await db.query(queryString);
    return matchedPosts.rows;
}

async function getTopicNameById(topicId) {
    let result = await db.query("SELECT topic.name from public.topic WHERE id=" + topicId);

    if (result === undefined || result.length == 0) {
        return {};
    }
    return result.rows[0];
}

module.exports = {
    add : addPost,
    getPostsByPage,
    getByid: getPost,
    addComment,
    getPostsByUser,
    getCommentsById,
    getPostsBySubject,
    getPostsByTopic,
    getTopicNameById
}