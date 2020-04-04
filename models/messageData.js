let db = require('../DB/db');
var messageList;

async function addMessage(receiverId, senderId, subject, content) {
    let result = await db.query(`INSERT INTO public.message_topic (subject, sender_id_fkey, receiver_id_fkey) VALUES('${subject}', ${senderId},'${receiverId}') RETURNING id;`);
    let message_topic_id = result.rows[0].id;
    db.query(`INSERT INTO public.message(sender_id_fkey, message_string, message_topic_id_fkey) VALUES(${senderId}, '${content}', ${message_topic_id})`);
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