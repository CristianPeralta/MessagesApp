import express from 'express'
import session from 'express-session'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const ejs  = require("ejs").__express
const initializeDatabases = require('./db')

const app = express();
const server = require('http').Server(app);
global.io = require('socket.io')(server);

const messageController = require('./controllers/messageController');

var usersOnline = [];

process.env.maxMessage = 10
global.maxMessages = process.env.maxMessage

const index = require('./routes/index')

initializeDatabases().then(dbs => {
  console.log('We are connented to DB');
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})

io.on('connection', (socket) => {
	console.log('A client has connected')

	socket.on('userConnected', (data) => {
      data.id = socket.id
      addClient(data, () => {
        io.emit('usersConnected', {data:usersOnline})
      })
	});

  socket.on('addMessagePrivated', (data) => {
    messageController.createSocket(data, (message, err) => {
      io.to(data.to.id).emit('addMessagePrivated', {data:message, ok:!err,err:err})
      io.to(socket.id).emit('addMessagePrivated', {data:message, ok:!err,err:err})
		})
	});

  socket.on('userDisconnect', function(data) {
    socket.disconnect()
    usersOnline.map((element, idx) => {
      if (element.user._id == data.user._id) {
        usersOnline.splice(idx,1)
      }
    })
    usersOnline = usersOnline.filter(function(n){ return n != undefined })
    io.emit('usersConnected', {data:usersOnline})
   })

	socket.on('disconnect', function() {
      console.log('Got disconnect!')
   })
})

function addClient (data, cb) {
  if (data.user != null) {
    let exist = false;
    if (usersOnline.length != 0) {
      exist = usersOnline.find((element) => {
        return (element.user._id == data.user._id)
      });
    }
    if (!exist) {
      usersOnline.push(data)
    }
    usersOnline = usersOnline.filter(function(n){ return n != undefined })
    cb()
  }
}


app.use(session({
    // When there is nothing on the session, do not save it
    saveUninitialized: false,
    // Update session if it changes
    resave: true,
    // Set cookie
    cookie: {
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000
    },
    // Name of your cookie
    name: 'testCookie',
    // Secret of your cookie
    secret: 'thisIsSecret'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
server.listen(5000, function() {
	console.log('Server running http://localhost:3000');
});
