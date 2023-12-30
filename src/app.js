//Express handles all the interactions between the frontend and the database, ensuring a smooth transfer of data to the end user. It can also be used to create and configure middleware to add things like logging, authentication and authorization, and other web development technologies
const express = require('express');
//Helmet. js is an open source JavaScript library that helps you secure your Node. js application by setting several HTTP headers. It acts as a middleware for Express and similar technologies, automatically adding or removing HTTP headers to comply with web security standards.
const helmet = require('helmet');
//The XSS technique commonly used to trigger Javascript or other types of malicious code that attempt to hijack runnable code. Usage of xss_clean(), we can stop the data and filter up, if any disallowed data is encountered it is rendered by xss_clean function and safe convert into the character entities
const xss = require('xss-clean');
//Express Mongo Sanitize is a package that provides middleware to sanitize user input before it is used in a database query. It is designed specifically to prevent NoSQL injection attacks in Node. js applications that use MongoDB.
const mongoSanitize = require('express-mongo-sanitize');
//Compression in Node. js and Express decreases the downloadable amount of data that's served to users. Through the use of this compression, we can improve the performance of our Node. js applications as our payload size is reduced drastically.
const compression = require('compression');
//CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server. The single-origin policy does not allow cross-origin requests and CORS headers are required to bypass this feature.
const cors = require('cors');
//HTTP response status codes are used in web development to determine whether a particular HTTP request has been completed successfully.
const httpStatus = require('http-status');
//express-session is a middleware module in Express. js that allows you to create sessions in your web application. It stores session data on the server side, using a variety of different storage options, and allows you to track the activity of a user across requests.
const session = require('express-session');
//Passport is a Node.js middleware that provides authentication and authorization mechanisms for web and mobile applications. It supports a variety of authentication strategies, including local, OAuth, OpenID, and JWT.
const passport = require('passport');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const { jwtStrategy } = require('./config/passport');




const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());


// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

//Middleware
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
// jwt authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use('jwt', jwtStrategy);

app.use('/v1', routes);

app.all('/', (req, res) => {
  res.send("Hello from KD's API")
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
