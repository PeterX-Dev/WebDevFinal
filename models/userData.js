// /* User object define */
// userObj = {
//     Id (Number) Primary Key
//     FirstName (String)
//     LastName (String)
//     Email(String)
//     Password(String)
//     Description(String)
//     Country(String)
//     DOB(Date)
//     ImageUrl(String)
//     PostNo(Number)  ??   
//     MsgNo(Number)   ??
//     LikesNo(Number) 
// }

var userList;

function addUser(e) {

}

function updateUser(e) {

}

function getAllUsers() {
    return userList;
}

function getUser(id) {
    return userList[id];
}

module.exports = {
    add : addUser,
    update : updateUser,
    getall : getAllUsers,
    getByid : getUser
}