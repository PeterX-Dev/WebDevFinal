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

// This is test data, will be replaced by DB API later
var userList = [
    {
        "Id":0,
        "FirstName":"user0",
        "LastName":"Xiong",
        "Email":"guilin2000@yahoo.com",
        "Password":"12",
        "Description":"This is a test!!!", 
        "Country":"12",
        "DOB":"",
        "ImageUrl":"https://randomuser.me/api/portraits/med/men/22.jpg",
        "PostNo":0,
        "MsgNo":0,
        "LikesNo":0
        }, 
    {
        "Id":1,
        "FirstName":"user1",
        "LastName":"Xiong",
        "Email":"guilin2000@yahoo.com",
        "Password":"123",
        "Description":"This is a test!!!", 
        "Country":"12",
        "DOB":"",
        "ImageUrl":"https://randomuser.me/api/portraits/med/women/22.jpg",
        "PostNo":0,
        "MsgNo":0,
        "LikesNo":0
    }
];

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

function checkMemberValidity(user) {
    var member = userList.filter(x => x.Email === user.email && x.Password === user.password);

    if (member === undefined || member.length == 0) {
        // array empty or does not exist
        return -1;
    }
    else{
        return member[0].Id;
    }
    
}

module.exports = {
    add : addUser,
    update : updateUser,
    getall : getAllUsers,
    getByid : getUser,
    checkValidity: checkMemberValidity
}