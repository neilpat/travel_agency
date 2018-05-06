var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var async = require('async');
var passport = require('passport');
var cors = require('cors');
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var userid;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var { check, validationResult } = require('express-validator/check');
var connection = mysql.createConnection({
		host     : 'localhost',
  	user     : 'root',
  	password : 'root',
  	database : 'mydb'

});

var cors_config = {
	origin : 'http://localhost:4200',
	methods: 'GET,PUT,POST,DELETE',
	credentials: true
};

app.use(cors(cors_config));

app.options('*', cors(cors_config));

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  }
  console.log('MySQL connected.');
  console.log('connected as id ' + connection.threadId);
});

//GET USERNAME BY: req.user.userid
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'mydb'
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'sec',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    let statement = "SELECT * FROM mydb.users WHERE username = ?";
    connection.query(statement, [username], (err, result) => {
      console.log(result[0].password)
      if (err){
        throw err;
      }
      else if(result[0].password.length === 0){
        return done(null, false);
      }
      else{
        if(result[0].password === password){
          userid = username;
          return done(null, true);
        }
        else{
          return done(null, false);
        }
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        console.log("Logged in");
        next();
    } else{
        console.log("Not logged in");
        res.status(401).json({"status":"error", "error":"Unable to authorize"});
    }
}

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if(err){
     return next(err);
    }
    else if(!user){
      return res.status(401).json({"status":"error", "error": "Login information is invalid."});
    }
    else{
      req.logIn(user, function(err) {
        if (err){
          return next(err);
        }
        return res.status(200).json({"status":"OK"});
      });
  }
  })(req, res, next);
});

app.post('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err)
      res.status(401).json({"status":"ERROR", "error":err});
    res.clearCookie('connect.sid');
    userid = null;
    res.status(200).json({"status":"OK"});
  });
});


app.get('/flights', (req, res, next) =>{
  let sql = 'SELECT * FROM mydb.flight;';
  var flights = new Array();
  console.log(userid)
  connection.query(sql, (err, result) => {
    if(err){
      next(err);
    }
    else{
      async.forEachOf(result, function(value, key, callback)  {

        var flight_obj = new Object();
        flight_obj.flight = value;
        let sourcestmt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";

        connection.query(sourcestmt, [value.SourceLocation] , (err2, result2) => {
          if (err2) {
            callback(err2);
          }
          else {
            flight_obj.sc = result2[0];
          }
        });

        let deststmt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
        connection.query(deststmt, [value.DestinationLocation] , (err3, result3) => {
            if(err){
              callback(err3);
            }
            flight_obj.dc = result3[0];
            flights.push(flight_obj);
            callback()
        });

    }, function(err)  {

        res.send(flights);

      })
}
});
});

app.get('/flights/:id', (req, res, next) =>{
  var id = req.params.id;
  var flight_obj = new Object();
  let stmnt = "SELECT * FROM mydb.flight WHERE mydb.flight.FlightNumber = ?";
  connection.query(stmnt, [id], (err, result) => {
     if(err){
      next(err);
    }
    else{
      flight_obj.flight = result[0];
      let sourcestmt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
      connection.query(sourcestmt, [result[0].SourceLocation] , (err2, result2) => {
          if (err2) {
            next(err2);
          }
          flight_obj.sc = result2[0];
        });

      let deststmt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
      connection.query(deststmt, [result[0].DestinationLocation] , (err3, result3) => {
        if(err3){
          next(err3);
          }
        flight_obj.dc = result3[0];
        res.send(flight_obj);
        });
    }
  });
});

app.get('/cars', (req, res, next) =>{
// /cars will have the car rental info
  let sql = 'SELECT * FROM mydb.carrental;';
  var cars = new Array();

  connection.query(sql, (err, result) => {
    if(err){
      next(err);
    }
    else{
      async.forEachOf(result, function(value, key, callback)  {

        var car_obj = new Object();
        car_obj.car = value;

        let stmnt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
        connection.query(stmnt, [value.Location] , (err2, result2) => {
            if(err){
              callback(err2);
            }
            car_obj.loc = result2[0];
            cars.push(car_obj);
            callback()
        });

    }, function(err)  {

        res.send(cars);

      })
}
});
});

app.get('/cars/:id', (req, res, next) =>{
  var id = req.params.id;
  var car_obj = new Object();
  let stmnt = "SELECT * FROM mydb.carrental WHERE mydb.carrental.ConfirmationId = ?";
  connection.query(stmnt, [id], (err, result) => {
     if(err){
      next(err);
    }
    else{
      car_obj.car = result[0];

        let stmnt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
        connection.query(stmnt, [result[0].Location] , (err2, result2) => {
            if(err){
              next(err2);
            }
            car_obj.loc = result2[0];
            res.send(car_obj);
        });
    }
  });
});

app.get('/cruises', (req, res, next) =>{
  let sql = 'SELECT * FROM mydb.cruise;';
  var cruises = new Array();

  connection.query(sql, (err, result) => {
    if(err){
      next(err);
    }
    else{
      async.forEachOf(result, function(value, key, callback)  {

        var cruise_obj = new Object();
        cruise_obj.boat = value;
        let sourcestmt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";

        connection.query(sourcestmt, [value.SourceLocation] , (err2, result2) => {
          if (err2) {
            callback(err2);
          }
          else {
            cruise_obj.sc = result2[0];
          }
        });

        let deststmt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
        connection.query(deststmt, [value.DestinationLocation] , (err3, result3) => {
            if(err){
              callback(err3);
            }
            cruise_obj.dc = result3[0];
            cruises.push(cruise_obj);
            callback()
        });

    }, function(err)  {

        res.send(cruises);

      })
}
});
});

app.get('/cruises/:id', (req, res, next) =>{
  var id = req.params.id;
  var cruise_obj = new Object();
  let stmnt = "SELECT * FROM mydb.cruise WHERE mydb.cruise.CruiseNumber = ?";
  connection.query(stmnt, [id], (err, result) => {
     if(err){
      next(err);
    }
    else{
      cruise_obj.boat = result[0];
      let sourcestmt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
      connection.query(sourcestmt, [result[0].SourceLocation] , (err2, result2) => {
          if (err2) {
            next(err2);
          }
          cruise_obj.sc = result2[0];
        });

      let deststmt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
      connection.query(deststmt, [result[0].DestinationLocation] , (err3, result3) => {
        if(err3){
          next(err3);
          }
        cruise_obj.dc = result3[0];
        res.send(cruise_obj);
        });
    }
  });
});


app.get('/hotels', (req, res, next) =>{
  let sql = 'SELECT * FROM mydb.accommodation;';
  var hotels = new Array();

  connection.query(sql, (err, result) => {
    if(err){
      next(err);
    }
    else{
      async.forEachOf(result, function(value, key, callback)  {

        var hotel_obj = new Object();
        hotel_obj.hotel = value;

        let stmnt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
        connection.query(stmnt, [value.Location] , (err2, result2) => {
            if(err){
              callback(err2);
            }
            hotel_obj.loc = result2[0];
            hotels.push(hotel_obj);
            callback()
        });

    }, function(err)  {

        res.send(hotels);

      })
}
});
});

app.get('/hotels/:id', (req, res, next) =>{
  var id = req.params.id;
  var hotel_obj = new Object();
  let stmnt = "SELECT * FROM mydb.accommodation WHERE mydb.accommodation.AccommodationID = ?";
  connection.query(stmnt, [id], (err, result) => {
     if(err){
      next(err);
    }
    else{
      hotel_obj.car = result[0];

        let stmnt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";
        connection.query(stmnt, [result[0].Location] , (err2, result2) => {
            if(err){
              next(err2);
            }
            hotel_obj.loc = result2[0];
            res.send(hotel_obj);
        });
    }
  });
});

app.post('/register', [check('username').exists().withMessage('No UserID provided.'), check('password').exists().withMessage('No password provided')], (req, res, next) => {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  else{
    var user = req.body.username;
    var pass = req.body.password;
    console.log(userid)
    console.log(user);
    console.log(pass);
    let smt = "INSERT INTO mydb.`Group`(GroupID, GroupSize) VALUES (0, 1)";
    connection.query(smt, (err, result) => {
      if (err){
        return next(err);
      }
    let smt2 = "SELECT * FROM mydb.`Group` WHERE mydb.`Group`.GroupID=(SELECT max(mydb.`Group`.GroupID) FROM mydb.`Group`)"
    connection.query(smt2, (err, result) => {
      let statement = "INSERT INTO mydb.Users(username, `password`, GroupID) VALUES (?,?,?)";
      var reg_return = new Object();
      connection.query(statement, [user, pass, result[0].GroupID], (err, result) => {
        if (err){
          return next(err);
        }
        return res.status(200).json({"ok": "ok"});
    });
    });
    });
  }
});

app.post('/payment', [check('CardNumber').exists().withMessage('No CardNumber provided.'), check("PaymentType").exists().withMessage('No PaymentType provided'),
  check("CardExpiration").exists().withMessage('No CardExpiration provided')], (req, res, next) => {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  var cardNum = req.body.CardNumber;
  var type = req.body.PaymentType;
  var expiration = req.body.CardExpiration;
  let smt = "SELECT * FROM mydb.users WHERE mydb.users.username = ?";
  let statement = "INSERT INTO mydb.Payment(CardNumber, PaymentType, CardExpiration, GroupID) VALUES (?,?,?,?)";
  connection.query(smt, [userid], (err, result) => {
    if (err){
      return next(err);
    }
    var group = result[0].GroupID;
    connection.query(statement, [cardNum, type, expiration, group], (err, result) => {
      if (err){
        return next(err);
      }
      return res.status(200).json({"ok": "ok"});
    });
  });
});

app.post('/deleteuser', (req, res, next) =>{
  let smt = "SELECT * FROM mydb.users WHERE mydb.users.username = ?"
  let statement = "DELETE FROM mydb.users WHERE mydb.users.username = ?";
  let statement2 = "DELETE FROM mydb.`Group` WHERE mydb.`group`.GroupID = ?";
    connection.query(smt, [userid], (err, result) => {
    if (err){
      return next(err);
    }
    var group = result[0].GroupID;
    connection.query(statement, [userid], (err, result) => {
      if (err){
        return next(err);
      }
      console.log("User Deleted");
    });
    connection.query(statement2, [group], (err, result) => {
      if (err){
        return next(err);
      }
      console.log("Group Deleted");
      return res.status(200).json({"ok": "ok"});
    });
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
