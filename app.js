var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var helmet = require('helmet');
//const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const SwaggerDocs = require('./swagger_docs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
app.use(helmet());

//mongo db server connection
mongoose.connect('mongodb://localhost/kellton_attendance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connection established");
});

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "Attendance System API",
//       description: "Attendance System API Information",
//       contact: {
//         name: "Kellton Developer"
//       },
//     },
//       host: ["http://localhost:3000"],
//       basePath: "/api/v1",
//       // security:{
//       //   bearerAuth: []
//       // }
//       schemes:["https", "http"],       
//   },
//   tags:{
//     name: "Register & Login",
//     description: "Register & Login"
//   },
//   apis: ['./routes/index.js']
//   //apis: ['./Personal.yaml']
// };

//const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerDocs.docs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
