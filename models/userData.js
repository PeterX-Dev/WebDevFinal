// /* User object define */
// userObj = {
//     id (Number) Primary Key
//     first_name (String)
//     last_name (String)
//     email(String)
//     password(String)
//     description(String)
//     country(String)
//     dob(Date)
//     image_url(String)
//     post_count(Number)  ??   
//     msg_count(Number)   ??
//     likes_count(Number) 
// }

// This is test data, will be replaced by DB API later
let db = require('../DB/db');

let userList = [];
// var userList = [
//     {
//         "id":0,
//         "FirstName":"user0",
//         "LastName":"Xiong",
//         "Email":"guilin2000@yahoo.com",
//         "Password":"12",
//         "Description":"This is a test!!!", 
//         "Country":"12",
//         "DOB":"",
//         "ImageUrl":"https://randomuser.me/api/portraits/med/men/22.jpg",
//         "PostNo":0,
//         "MsgNo":0,
//         "LikesNo":0
//         }, 
//     {
//         "id":1,
//         "FirstName":"user1",
//         "LastName":"Xiong",
//         "Email":"guilin2000@yahoo.com",
//         "Password":"123",
//         "Description":"This is a test!!!", 
//         "Country":"12",
//         "DOB":"",
//         "ImageUrl":"https://randomuser.me/api/portraits/med/women/22.jpg",
//         "PostNo":0,
//         "MsgNo":0,
//         "LikesNo":0
//     }
// ];

async function addUser(e) {
    await db.query("Insert into member(first_name, last_name, email, password) VALUES ('" 
                + e.firstName + "','" + e.lastName + "','" + e.email + "','" + e.password +"')");
    
    userList = await getDataFromDB();

    var user = userList.filter(x => x.first_name === e.firstName && 
                                    x.last_name === e.lastName && 
                                    x.email === e.email && 
                                    x.password === e.password);

    if (user === undefined || user.length == 0) {
        // array empty or does not exist
        return -1;
    }
    else{
        return user[0].id;
    } 
}

async function updateUser(e) {
    // await db.query("Update member SET image_url=" + e.imageurl + ", description=" + e.description + ", country="
    //             + e.country + ", dob=" + e.DOB + " WHERE id=" + Number(e.userId));

    // let e = {
    //     imageurl: 'https://randomuser.me/api/portraits/med/men/22.jpg',
    //     description: 'this is a test111111',
    //     country: 'canada',
    //     DOB: '2020-04-15',
    //     userId: '18',
    //     completeBtn: 'complete registration' 
    // };

    // await db.query("Update public.member SET image_url='" + e1.imageurl + "' WHERE id=" + Number(e1.userId));
    await db.query("Update member SET image_url='" + e.imageurl + "', description='" + e.description 
                + "', country='" + e.country + "', dob='" + e.DOB + "' WHERE id=" + Number(e.userId));

    userList = await getDataFromDB();
    console.log(userList);
}

function getAllUsers() {
    return userList;
}

function getUser(id) {
    let user = userList.filter(x => x.id === Number(id));
    if (user === undefined || user.length == 0) {
        return {};
    }
    else{
        return user[0];
    }
    // return await db.query('Select * from member where id = ' + id);
}

async function checkMemberValidity(user) {
    if (userList.length == 0)
    {
        userList = await getDataFromDB();
    }

    var member = userList.filter(x => x.email === user.email && x.password === user.password);

    if (member === undefined || member.length == 0) {
        // array empty or does not exist
        return -1;
    }
    else{
        return member[0].id;
    } 
}

async function checkNoRepeatUserExist(user) {
    // if userList is empty, need to read in data
    if (userList.length == 0)
    {
        userList = await getDataFromDB();
    }

    var user = userList.filter(x => x.email === user.email || 
        (x.first_name === user.firstName && 
        x.last_name === user.lastName)
    );

    if (user === undefined || user.length == 0) {
        // array empty or does not exist, no repeat user existed
        return true;
    }
    else{
        return false;
    }  
}

async function getDataFromDB() {
    let myuserList = await db.query('SELECT * from public.member');
    return myuserList.rows;
}

module.exports = {
    add : addUser,
    update : updateUser,
    getall : getAllUsers,
    getByid : getUser,
    checkValidity: checkMemberValidity,
    checkNoRepeat: checkNoRepeatUserExist
}