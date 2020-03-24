/* Discussion object define */
// discussionObj = {
//     Id (Number) Primary Key
//     Subject (String)
//     Topic(String)      
// }

var discussionList;

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