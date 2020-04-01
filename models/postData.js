/* Discussion object define */
// discussionObj = {
//     Id (Number) Primary Key
//     Subject (String)
//     Topic(String)      
// }
let db = require('../DB/db');
var postList = [
    {
        "id": "1",
        "ImageUrl": "https://randomuser.me/api/portraits/women/26.jpg",
        "Subject": "nodejs",
        "Topic": "Help with Nodejs!!!",
        "Message": "I am a noob. I only know html and css. Pls halp!",
        "Date": "30 mar 2020",
        "Replies": "2"
    },
    {
        "id": "2",
        "ImageUrl": "https://randomuser.me/api/portraits/men/26.jpg",
        "Subject": "php",
        "Topic": "I hate this framework.",
        "Message": "Don't mind me. I am venting. jk lol",
        "Date": "1 apr 2020",
        "Replies": "10"
    },
    {
        "id": "3",
        "ImageUrl": "https://randomuser.me/api/portraits/men/60.jpg",
        "Subject": "nodejs",
        "Topic": "Need HELP!",
        "Message": "How do I make a server using nodejs?",
        "Date": "1 apr 2020",
        "Replies": "5"
    }
];

function addPost(e) {
    db.query("Insert into post(post_string, member_id_fkey) VALUES ('Hi i have a question', 2)");
}

async function getAllPosts() {
    //get all posts with user images and topic info
    let queryString = "SELECT post.id, post.subject_line, post.post_string, post.date, topic.name, member.id as \"member_id\", member.image_url \
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