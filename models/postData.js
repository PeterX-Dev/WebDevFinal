/* Post object define */
// postObj = {
//     Id (Number) Primary Key
//     PublisherId (String) Foreign Key – User Table
//     PostDate(Date)
//     Contents(String)
//     DiscussionId  Foreign Key – Discussion Table
//     MainPost (Boolean)  
// }
let client = require('../DB/db');

var postList;

function addPost(e) {
    client.connect();
    client.query("Insert into Post (content, user_id_fkey) VALUES ('Howdy there',2,);", (err, res) => {
        if (err) {
            console.log(JSON.stringify(err));
            console.log("there was an error");
        } else {
            console.log("OK!" + JSON.stringify(res));
        }
    });
    client.end();
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