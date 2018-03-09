// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');

var session = require('express-session');
app.use(session({secret: 'codingdojorocks'}));  // string for encryption
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    // if(req.session['count'] == null){
    //     req.session['count'] = 0
    // }
    // else{
    //     req.session['count'] +=1
    // }
    // console.log(req.session['count']);
    // var context = {
    //     count: req.session['count']
    // }

 res.render("index");
})
// post route for adding a user
app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.redirect('/');
})
// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

var count = 0

io.sockets.on('connection', function (socket) {
    console.log("Client/123socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // all the server socket code goes in here
    socket.on( "message_sent", function (data){
        io.emit('server_response', {response: data.content});
    })
     
})