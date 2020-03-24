/* Post object define */
// postObj = {
//     Id (Number) Primary Key
//     PublisherId (String) Foreign Key – User Table
//     PostDate(Date)
//     Contents(String)
//     DiscussionId  Foreign Key – Discussion Table
//     MainPost (Boolean)  
// }

var postList;

function addPost(e) {

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