let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let connectDB = require('./DB/db');

const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let discussionRoutes = require('./routes/discussion');
let loginRoutes = require('./routes/login');
let mainRoutes = require('./routes/main');
let messageRoutes = require('./routes/message');
let postRoutes = require('./routes/post');
let profileRoutes = require('./routes/profile');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req,res) {
    res.redirect(301, '/login');
});

app.use(discussionRoutes);
app.use(loginRoutes);
app.use(mainRoutes);
app.use(messageRoutes);
app.use(postRoutes);
app.use(profileRoutes);

// connectDB();

app.listen(process.env.PORT || 3000, () => console.log('Server ready @ port 3000'))



