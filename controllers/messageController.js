const mod_msg = require('../models/messageData');
let mod_user = require('../models/userData.js');
const emailer = require('../emailer/email');
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

exports.showMessagePage = async function(req,res,next) {
    let userId =  req.session.userId; 
    let allMessages = await mod_msg.getall();

    // console.log(allMessages);

    // TBD-Peter: reorganized data for display
    let myMessageList = allMessages.filter(x => (x.topic.sender_id_fkey === Number(userId) || x.topic.receiver_id_fkey === Number(userId)));

    for (let index = 0; index < myMessageList.length; index++) {
        const element = myMessageList[index];
        let attenderId;
        let day;

        // if (element.topic.sender_id_fkey === Number(userId)) {          
        //     attenderId = element.topic.sender_id_fkey;
        // } else if (element.topic.receiver_id_fkey === Number(userId)) {
        //     attenderId = element.topic.receiver_id_fkey;
        // }

        // Sender is the person who initial the message
        attenderId = element.topic.sender_id_fkey;

        element.topic.attenderId = attenderId;
        let attenderObj = await mod_user.getByid(attenderId);
        element.topic.attender_imageurl = attenderObj.image_url;
        element.topic.attender_name = attenderObj.first_name + ' ' + attenderObj.last_name;

        let d1= new Date(element.topic.date);

        day = '' + d1.getDate(); 
        if (day.length < 2) 
            day = '0' + day;

        element.topic.localdate = monthNames[d1.getMonth()] + " " + day;

        element.topic.active = false;

        let messageOfTopic = element.message;
        for (let index1 = 0; index1 < messageOfTopic.length; index1++) {
            const element1 = messageOfTopic[index1];
            
            let senderObj = await mod_user.getByid(element1.sender_id_fkey);
            element1.sender_imageurl = senderObj.image_url;
            element1.sender_name = senderObj.first_name + ' ' + senderObj.last_name;

            // This is used to change Date to yyyy-mm-dd
            // i.e. 2020-04-09T07:00:00.000Z to 2020-04-09
            let d1= new Date(element1.date);

            day = '' + d1.getDate();

            if (day.length < 2) 
                day = '0' + day;

            element1.localdate = monthNames[d1.getMonth()] + " " + day;
            element1.localtime = d1.toLocaleTimeString('en-US');
        }
    };
    // console.log(myMessageList);

    console.log(req.query.topicId);

    // Reverse myMessageList to display latest first
    myMessageList = myMessageList.reverse();

    // The default topic item is the first one, when user choose other topic, 
    // will pass the chosen topic here and refresh messages accordingly
    let currentTopicId;
    if (req.query.topicId == undefined || Number(req.query.topicId) === -1) {
        if (myMessageList.length >= 1)
            currentTopicId = myMessageList[0].topic.id;
    }
    else {
        currentTopicId = Number(req.query.topicId);
    }       
    let currentTopic = myMessageList.filter(x => x.topic.id === currentTopicId);

    let currentMessages = [];
    if (currentTopic.length >= 1){
        currentTopic[0].topic.active = true;
        currentMessages = currentTopic[0].message;
    }
        
    // console.log(currentTopic[0].message);

    res.render('messagePage',{ 
        messagePageCSS: true, 
        topics: myMessageList, 
        messages: currentMessages,
        currentTopicId: currentTopicId
    });
}

exports.showMessageEditPage = function(req,res,next) {  
    let receiverId = req.body.receiverId;
    let receiverImage = req.body.imageUrl;
    // console.log(replyObj); 
    res.render('messageEditPage' ,{messageEditPageCSS: true, receiverId, receiverImage});
}

exports.sendMessage = async function(req,res,next) {
    let receiverId = req.body.receiverId;
    let subject = req.body.subject;
    let message = req.body.message; 
    mod_msg.add(receiverId, req.session.userId , subject, message);
    let receiver = await mod_user.getByid(receiverId);
    let sender = await mod_user.getByid(req.session.userId);
    emailer.send(receiver.first_name, receiver.email, sender.first_name, subject, message);
    res.redirect('/othersPost?userId='+receiverId);
}

exports.newMessageReply = async function(req,res,next) {
    let newMessageObj = req.body;
    newMessageObj.senderId = req.session.userId;
    console.log(newMessageObj); 

    // Coming here, we need to save message into DB
    // we need message_topic_id_fkey in order to save this message
    // use POST to send it from previous page 
    await mod_msg.addMsgOnly(newMessageObj);

    res.redirect('/message?topicId='+newMessageObj.messageTopicId);
}