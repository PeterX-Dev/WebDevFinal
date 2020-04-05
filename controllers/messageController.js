const mod_msg = require('../models/messageData');
let mod_user = require('../models/userData.js');

exports.showMessagePage = async function(req,res,next) {
    // let mockMessage = [{name: "Frank Lee", title: "hi there", senderImg: "https://randomuser.me/api/portraits/med/women/2.jpg", date:"Sep 12"},
    // {name: "Frank Lee", title: "hi there", senderImg: "https://randomuser.me/api/portraits/med/women/2.jpg", date:"Sep 12"}
    // ];
    // let mockReply = [
    //     {sender: "Frank Lee", date: "SEP 4", time: "9:57 PM", message: "Umm, give me some time to think about it ...", senderImg: "https://randomuser.me/api/portraits/med/men/24.jpg"},
    //     {sender: "Jane Way", date: "SEP 4", time: "9:57 PM", message: "Umm, give me some time to think about it ...", senderImg: "https://randomuser.me/api/portraits/med/women/2.jpg"}
    // ];

    let userId =  req.session.userId; 
    let allMessages = await mod_msg.getall();

    // console.log(allMessages);

    // TBD-Peter: reorganized data for display
    // let myMessageList = allMessages.filter(x => (x.topic.sender_id_fkey === Number(userId) || x.topic.receiver_id_fkey === Number(userId)));

    for (let index = 0; index < allMessages.length; index++) {
        const element = allMessages[index];
        let attenderId;
        if (element.topic.sender_id_fkey === Number(userId) || element.topic.receiver_id_fkey === Number(userId)) {
            if (element.topic.sender_id_fkey === Number(userId)) {
                attenderId = element.topic.receiver_id_fkey;
            } else if (element.topic.receiver_id_fkey === Number(userId)) {
                attenderId = element.topic.sender_id_fkey;
            }
            element.topic.attenderId = attenderId;
            let attenderObj = await mod_user.getByid(attenderId);
            element.topic.attender_imageurl = attenderObj.image_url;
            element.topic.attender_name = attenderObj.first_name + ' ' + attenderObj.last_name;

            element.topic.date = "Sep 12";    // TBD-Peter

            let messageOfTopic = element.message;

            for (let index1 = 0; index1 < messageOfTopic.length; index1++) {
                const element1 = messageOfTopic[index1];
                
                let senderObj = await mod_user.getByid(element1.sender_id_fkey);
                element1.sender_imageurl = senderObj.image_url;
                element1.sender_name = senderObj.first_name + ' ' + senderObj.last_name;
            }
        }      
    };
//    console.log(allMessages);

    // TBD-Peter, the default topic item is the first one, when user choose other topic, 
    // will pass the chosen topic here and refresh messages accordingly
    let currentTopicId = 6;
    let currentTopic = allMessages.filter(x => x.topic.id === currentTopicId);

    console.log(currentTopic[0].message);

//    res.render('messagePage',{ messagePageCSS: true, message: mockMessage, reply: mockReply});
    res.render('messagePage',{ 
        messagePageCSS: true, 
        topics: allMessages, 
        messages: currentTopic[0].message,
        currentTopicId: currentTopicId
    });
}

exports.showMessageEditPage = function(req,res,next) {  
    let receiverId = req.body.receiverId;
    let receiverImage = req.body.imageUrl;
    // console.log(replyObj); 
    res.render('messageEditPage' ,{messageEditPageCSS: true, receiverId, receiverImage});
}

exports.sendMessage = function(req,res,next) {
    let receiverId = req.body.receiverId;
    let subject = req.body.subject;
    let message = req.body.message; 
    mod_msg.add(receiverId, req.session.userId , subject, message);

    res.redirect('/othersPost?userId='+receiverId);
    // res.render('othersPostPage' ,{      
    //     });
}

exports.newMessageReply = async function(req,res,next) {
    let newMessageObj = req.body;
    newMessageObj.senderId = req.session.userId;
    console.log(newMessageObj); 

    // Coming here, we need to save message into DB
    // we need message_topic_id_fkey in order to save this message
    // use POST to send it from previous page 
    await mod_msg.addMsgOnly(newMessageObj);

    res.redirect('/message');

    // res.render('messagePage' ,{      
    // });
}