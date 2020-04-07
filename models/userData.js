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

let db = require('../DB/db');

let userList = [];
async function addUser(e) {
    let queryString = 'Insert into member(first_name, last_name, email, password, likes_count, image_url, description, country, dob) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    await db.query(queryString, [e.firstName, e.lastName, e.email, e.password, 0, e.imageurl, e.description, e.country, e.DOB]);
    
    // Update userList when there is data change
    await updateLocalUserData();

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

async function updateUser(e, updateAll=false) {
    let queryText;

    if (updateAll) 
    {
        queryText = 'UPDATE member SET first_name=$1, last_name=$2, email=$3, password=$4, image_url=$5, description=$6, country=$7, dob=$8 WHERE id=$9';
        await db.query(queryText, [e.firstName, e.lastName, e.email, e.password, e.imageurl, e.description, e.country, e.DOB, e.userId]);
    }
    else 
    {
        queryText = 'UPDATE member SET image_url=$1, description=$2, country=$3, dob=$4 WHERE id=$5';
        await db.query(queryText, [e.imageurl, e.description, e.country, e.DOB, e.userId]);
    }

    // Update userList when there is data change
    await updateLocalUserData();
}

async function updateUserLikesCount(id) {
    if (id === undefined || id.length == 0) {
        return {};
    }
    let queryString = "SELECT * FROM public.member WHERE id = " + Number(id) + ";"
    let userResults = await db.query(queryString);

    console.log(userResults.rows);
    let likesCount = userResults.rows[0].likes_count;
    if (likesCount == null)   likesCount = 0;
    likesCount ++;

    let queryText = 'UPDATE member SET likes_count=$1 WHERE id=$2';
    await db.query(queryText, [likesCount, Number(id)]);

    // Update userList when there is data change
    await updateLocalUserData();
}

function getAllUsers() {
    return userList;
}

async function getUser(id) {
    // let queryString = "SELECT id, first_name, last_name, email, description, image_url, post_count, msg_count, likes_count \
    //                     FROM public.member \
    //                     WHERE id = " + id + ";";

    if (id === undefined || id == null) {
        return {};
    }
 
    // let queryString = "SELECT * FROM public.member WHERE id = " + id + ";";
    // let userResults = await db.query(queryString);
    // let user = userResults.rows[0];
    // return user;

    let userObj = userList.filter(x => x.id === Number(id));

    if(userObj.length !== 1)    // something wrong here
        return {};
    else
        return userObj[0];
}

async function checkMemberValidity(user) {
    if (userList.length == 0)
    {
        await updateLocalUserData();
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
        await updateLocalUserData();
    }

    var user = userList.filter(x => x.email === user.email);

    if (user === undefined || user.length == 0) {
        // array empty or does not exist, no repeat user existed
        return true;
    }
    else{
        return false;
    }  
}

async function updateLocalUserData() {
    let myuserList = await db.query('SELECT * from public.member');
    userList = myuserList.rows;
}



module.exports = {
    add : addUser,
    update : updateUser,
    updateLikes: updateUserLikesCount,
    getall : getAllUsers,
    getByid : getUser,
    checkValidity: checkMemberValidity,
    checkNoRepeat: checkNoRepeatUserExist
}