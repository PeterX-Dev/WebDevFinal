exports.showMyPostPage = function(req,res,next) {  
    let replyObj = req.body
    let postList = [
        {
            ImageUrl: "https://randomuser.me/api/portraits/med/men/22.jpg",
            Subject:"Hello1",
            Topic: "php",
            Message: "This is a test0 This is a test0 This is a test0 This is a test0 This is a test0",
            Date: "Oct 10 2019",
            Replies: 5
        },
        {
            ImageUrl: "https://randomuser.me/api/portraits/med/women/22.jpg",
            Subject:"Hello2",
            Topic: "node",
            Message: "This is a test1 This is a test1 This is a test1 This is a test1 This is a test1",
            Date: "Oct 11 2019",
            Replies: 1
        }
    ];

    let userObj = {
        ImageUrl: "https://randomuser.me/api/portraits/med/women/22.jpg",
        FirstName: "user1",
        LastName: "White",
        Description: "Team Lead | Part Time Singer | Full time Mom Canada",
        PostNo: 5,
        MsgNo: 1
    }
    res.render('myPostPage' ,{
        user: userObj,
        posts: postList,
        discussionCSS: true,
        myPostCSS: true
    });
}

exports.showOthersPostPage = function(req,res,next) {  
    let replyObj = req.body
    console.log(replyObj); 
    res.render('othersPostPage' ,{      
    });
}

