const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const swaggerUi = require("swagger-ui-express");
const SwaggerDocs = require('./swagger_docs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
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

//middleware for all paths
app.all('*', validateToken);

function validateToken(req, res, next) {

        if ( req.path == '/api/v1/register'|| req.path=='/api/v1/holidays'|| req.path == '/api/v1/login'|| req.path == '/api/v1/forgot_Password'|| req.path=='/api/v1/apidocs') 
            return next();

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({message: "Unauthorised."});
        }
        try {
            const verified = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            res.status(401).send({message: "Invalid token.", error: `${error}`});
        }

  next();

}

// app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(SwaggerDocs.docs));
app.use('/apidocs', function (req, res, next) {
    SwaggerDocs.docs.host = req.get('host');
    req.swaggerDoc = SwaggerDocs.docs;
    next();
}, swaggerUi.serve, swaggerUi.setup());

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
