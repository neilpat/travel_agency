var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var async = require('async');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var connection = mysql.createConnection({
	host     : 'localhost',
  	user     : 'root',
  	password : 'root',
  	database : 'mydb'

})

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  }
  console.log('MySQL connected.');
  console.log('connected as id ' + connection.threadId);
});

app.get('/home', (req, res, next) =>{
// /home will have flights 
  let sql = 'SELECT * FROM mydb.flight;';
  var flights = new Array();

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
        let sourcestmt = "SELECT * FROM mydb.Location WHERE mydb.Location.LocationID = ?";


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
