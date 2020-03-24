/* Message object define */
// messageObj = {
//     Id (Number) Primary Key
//     SenderId (String) Foreign Key – User Table
//     ReceiverId (String) Foreign Key – User Table
//     MsgDate(Date)
//     Contents(String)    
// }

var messageList;

function addMessage(e) {

}

function getAllMessages() {
    return messageList;
}

function getMessage(id) {
    return messageList[id];
}

module.exports = {
    add : addMessage,
    getall : getAllMessages,
    getByid: getMessage 
}