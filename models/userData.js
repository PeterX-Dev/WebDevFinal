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

async function updateUser(e, updateAll=false) {
    // await db.query("Update member SET image_url=" + e.imageurl + ", description=" + e.description + ", country="
    //             + e.country + ", dob=" + e.DOB + " WHERE id=" + Number(e.userId));

    // await db.query("Update public.member SET image_url='" + e1.imageurl + "' WHERE id=" + Number(e1.userId));
    let queryText;

    if (updateAll) 
    {
        queryText = 'UPDATE member SET first_name=$1, last_name=$2, email=$3, password=$4, image_url=$5, description=$6, country=$7, dob=$8 WHERE id=$9';
        await db.query(queryText, [e.firstName, e.lastName, e.email, e.password, e.imageurl, e.description, e.country, e.DOB, e.userId]);
    }
    else 
    {
        // await db.query("UPDATE member SET image_url='" + e.imageurl + "', description='" + e.description 
        //     + "', country='" + e.country + "', dob='" + e.DOB + "' WHERE id=" + Number(e.userId));
        queryText = 'UPDATE member SET image_url=$1, description=$2, country=$3, dob=$4 WHERE id=$5';
        await db.query(queryText, [e.imageurl, e.description, e.country, e.DOB, e.userId]);
    }

    userList = await getDataFromDB();
}

function getAllUsers() {
    return userList;
}

async function getUser(id) {
    // let queryString = "SELECT id, first_name, last_name, email, description, image_url, post_count, msg_count, likes_count \
    //                     FROM public.member \
    //                     WHERE id = " + id + ";";
    if (id === undefined || id.length == 0) {
        return {};
    }
    let queryString = "SELECT * FROM public.member WHERE id = " + id + ";";
    let userResults = await db.query(queryString);
    let user = userResults.rows[0];
    return user;
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