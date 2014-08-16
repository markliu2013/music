/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var domain = require('domain');
//var domain = require('logger');

var env = process.env.NODE_ENV || 'development'
var config = require('./config/config')[env]

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/mp3/' }));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//引入一个domain的中间件，将每一个请求都包裹在一个独立的domain中
//domain来处理异常
app.use(function (req, res, next) {
    var d = domain.create();
    //监听domain的错误事件
    d.on('error', function (err) {
        //logger.error(err);
        res.statusCode = 500;
        res.json({sucess:false, messag: '服务器异常'});
        d.dispose();
    });

    d.add(req);
    d.add(res);
    d.run(next);
});
var d = domain.create();
d.on('error',function(err){
    console.log(err);
});
app.get('/', routes.index);
app.post('/upload', routes.upload);
app.get('/users', user.list);
app.del('/:id', routes.delete);

// Bootstrap db connection
// Connect to mongodb
var connect = function () {
	var options = { server: { socketOptions: { keepAlive: 1 } } }
	mongoose.connect(config.db, options)
}
connect()

// Error handler
mongoose.connection.on('error', function (err) {
	console.log(err)
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
	connect()
})



d.run(function() {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});