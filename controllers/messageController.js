const mod_msg = require('../models/messageData');
let mod_user = require('../models/userData.js');

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    let myMessageList = allMessages.filter(x => (x.topic.sender_id_fkey === Number(userId) || x.topic.receiver_id_fkey === Number(userId)));

    for (let index = 0; index < myMessageList.length; index++) {
        const element = myMessageList[index];
        let attenderId;
        let day;

        if (element.topic.sender_id_fkey === Number(userId)) {
            attenderId = element.topic.receiver_id_fkey;
        } else if (element.topic.receiver_id_fkey === Number(userId)) {
            attenderId = element.topic.sender_id_fkey;
        }
        element.topic.attenderId = attenderId;
        let attenderObj = await mod_user.getByid(attenderId);
        element.topic.attender_imageurl = attenderObj.image_url;
        element.topic.attender_name = attenderObj.first_name + ' ' + attenderObj.last_name;

        // element.topic.date = "Sep 12";    // TBD-Peter
        let d1= new Date(element.topic.date);

        day = '' + d1.getDate(); 
        if (day.length < 2) 
            day = '0' + day;

        element.topic.date = monthNames[d1.getMonth()] + " " + day;

        element.topic.active = false;

        let messageOfTopic = element.message;
        for (let index1 = 0; index1 < messageOfTopic.length; index1++) {
            const element1 = messageOfTopic[index1];
            
            let senderObj = await mod_user.getByid(element1.sender_id_fkey);
            element1.sender_imageurl = senderObj.image_url;
            element1.sender_name = senderObj.first_name + ' ' + senderObj.last_name;
            //TBD-Peter

            // This is used to change Date to yyyy-mm-dd
            // i.e. 2020-04-09T07:00:00.000Z to 2020-04-09
            let d1= new Date(element1.date);

            day = '' + d1.getDate();

            if (day.length < 2) 
                day = '0' + day;

            element1.date = monthNames[d1.getMonth()] + " " + day;
            element1.time = d1.toLocaleTimeString('en-US');
        }   
    };
    console.log(myMessageList);

    console.log(req.query.topicId);

    // TBD-Peter, the default topic item is the first one, when user choose other topic, 
    // will pass the chosen topic here and refresh messages accordingly
    let currentTopicId;
    if (req.query.topicId == undefined || Number(req.query.topicId) === -1) {
        currentTopicId = myMessageList[0].topic.id;
    }
    else {
        currentTopicId = Number(req.query.topicId);
    }       
    let currentTopic = myMessageList.filter(x => x.topic.id === currentTopicId);

    currentTopic[0].topic.active = true;
    console.log(currentTopic[0].message);

//    res.render('messagePage',{ messagePageCSS: true, message: mockMessage, reply: mockReply});
    res.render('messagePage',{ 
        messagePageCSS: true, 
        topics: myMessageList, 
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

    res.redirect('/message?topicId='+newMessageObj.messageTopicId);
}