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

function addComment(e) {

}

function getAllComments() {
    return postList;
}

function getComment(id) {
    return postList[id];
}

module.exports = {
    add : addComment,
    getall : getAllComments,
    getByid: getComment 
}