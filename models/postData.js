/* Post object define */
// postObj = {
//     Id (Number) Primary Key
//     PublisherId (String) Foreign Key – User Table
//     PostDate(Date)
//     Contents(String)
//     DiscussionId  Foreign Key – Discussion Table
//     MainPost (Boolean)  
// }
let db = require('../DB/db');

var postList;

function addPost(e) {
    db.query("Insert into Post (content, user_id_fkey) VALUES ('Howdy there',2,)");
}

function getAllPosts() {
    return postList;
}

function getPost(id) {
    return postList[id];
}

module.exports = {
    add : addPost,
    getall : getAllPosts,
    getByid: getPost 
}