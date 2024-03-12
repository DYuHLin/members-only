var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const userModel = require('./models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => {console.log(err)});
async function main() {
  await mongoose.connect(mongoDB);
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(
  new LocalStrategy(async (name, password, done) => {
    try{
      const user = await userModel.findOne({name: name});
      if(!user) {
        return done(null, false, {message: "Incorrect Username"});
      }
      const match = await bcrypt.compare(password, user.password);
      if(!match){
        return done(null, false, {message: "Incorrect Password"});
      }
      return done(null, user);
    } catch(err){
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try{
    const user = await userModel.findById(id);
    done(null, user);
  } catch(err){
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.CurrentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/register', (req, res, next) => {
try{
  bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
    if(err){
      return next(err);
    } else if(req.body.password !== req.body.confirmpassword){
      console.log("passwords don't match")
      return next(err);
    } else {
      const user = new userModel({
        firstname: req.body.firstname,
        surname: req.body.surname,
        password: hashedPassword,
        name: req.body.name,
        admin: false,
        member: false,
      });

      const result = user.save();
      res.redirect("/login");
    };
  });
} catch(err){
  next(err)
}
});

app.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
  }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
