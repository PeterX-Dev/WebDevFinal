exports.showMessagePage = function(req,res,next) {  
    let mockMessage = [{name: "Frank Lee", title: "hi there", senderImg: "https://randomuser.me/api/portraits/med/women/2.jpg", date:"Sep 12"},
    {name: "Frank Lee", title: "hi there", senderImg: "https://randomuser.me/api/portraits/med/women/2.jpg", date:"Sep 12"}
    ];
    let mockReply = [
        {sender: "Frank Lee", date: "SEP 4", time: "9:57 PM", message: "Umm, give me some time to think about it ...", senderImg: "https://randomuser.me/api/portraits/med/men/24.jpg"},
        {sender: "Jane Way", date: "SEP 4", time: "9:57 PM", message: "Umm, give me some time to think about it ...", senderImg: "https://randomuser.me/api/portraits/med/women/2.jpg"}
    ];
    res.render('messagePage',{ messagePageCSS: true, message: mockMessage, reply: mockReply});
}

exports.showMessageEditPage = function(req,res,next) {  
    // let replyObj = req.body
    // console.log(replyObj); 
    res.render('messageEditPage' ,{messageEditPageCSS: true});
}

exports.sendMessage = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('othersPostPage' ,{      
    });
}

exports.newMessageReply = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('messagePage' ,{      
    });
}