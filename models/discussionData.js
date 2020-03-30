/* Discussion object define */
// discussionObj = {
//     Id (Number) Primary Key
//     Subject (String)
//     Topic(String)      
// }

var discussionList = [
    {
        "Id": "1",
        "ImageUrl": "https://randomuser.me/api/portraits/women/26.jpg",
        "Subject": "nodejs",
        "Topic": "Help with Nodejs!!!",
        "Message": "I am a noob. I only know html and css. Pls halp!",
        "Date": "30 mar 2020",
        "Replies": "2"
    },
    {
        "Id": "2",
        "ImageUrl": "https://randomuser.me/api/portraits/men/26.jpg",
        "Subject": "php",
        "Topic": "Jesus Christ, I hate this framework.",
        "Message": "Don't mind me. I am venting. jk lol",
        "Date": "1 apr 2020",
        "Replies": "10"
    }
];

function addDiscussion(e) {

}

function getAllDiscussions() {
    return discussionList;
}

function getDiscussion(id) {
    return discussionList[id];
}

module.exports = {
    add : addDiscussion,
    getall : getAllDiscussions,
    getByid: getDiscussion 
}