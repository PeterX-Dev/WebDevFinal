exports.showMainPage = function(req,res,next) {
    let name = req.session.userId;
    console.log("userid: "+name);
    res.render('mainPage' ,{      
    });
}

exports.logout = function(req,res,next) {  
    let replyObj = req.body;
    console.log(replyObj); 
    res.render('loginPage' ,{      
    });
}

exports.searchByTitle = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('discussionPage' ,{      
    });
}

exports.searchByTopic = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 
    res.render('discussionPage' ,{      
    });
}

exports.postToTimeLine = function(req,res,next) {
    let replyObj = req.body;
    console.log(replyObj); 

    // Updating related data ...

    res.render('mainPage' ,{      
    });
}

exports.next = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 

    // Updating discussion and post data to be displayed 

    res.render('mainPage' ,{      
    });
}

exports.prev = function(req,res,next) {
    let replyObj = req.body
    console.log(replyObj); 

    // Updating discussion and post data to be displayed 

    res.render('mainPage' ,{      
    });
}