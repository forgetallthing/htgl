const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const schedule = require("node-schedule");
const https = require("https");
const Config = require("./common/config.js");
const common = require("./common/common");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoMorgan = require("mongo-morgan");
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const app = express();
const routerMap = require("./routes/router");
const loginRouter = require("./routes/login");

const MongoClient = require("mongodb").MongoClient;
let mongoUrl = "mongodb://" + Config.sys_mongo;
if (Config.hasUser) mongoUrl = "mongodb://" + Config.DB_USER + ":" + Config.DB_PW + "@" + Config.sys_mongo;

MongoClient.connect(mongoUrl, {
  authSource: "admin",
  useNewUrlParser: true,
  autoReconnect: true,
  connectTimeoutMS: 3600000,
  socketTimeoutMS: 3600000,
  wtimeout: 0
}, function (err, client) {
  if (err) throw err;
  const db = client.db(Config.mongo_db);
  global.mongodb = db;
  console.log("mongodb连接成功")
  //添加全局toObjectID方法
  const ObjectID = require("mongodb").ObjectID;
  global.toObjectID = function (id) {
    if (typeof (id) == "string") {
      return ObjectID(id);
    }
    return id;
  }
});

//日志
MongoClient.connect(mongoUrl, {
  authSource: "admin",
  useNewUrlParser: true,
  connectTimeoutMS: 3600000,
  socketTimeoutMS: 3600000,
  wtimeout: 0
}, function (err, client) {
  if (err) throw err;
  const db = client.db(Config.log_db);
  global.logdb = db;
});

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

//启用压缩数据
app.use(compression());

//启用session
let sessionMongoUrl = "mongodb://" + Config.sys_mongo + "/" + Config.mongo_db;
if (Config.hasUser) sessionMongoUrl = "mongodb://" + Config.DB_USER + ":" + Config.DB_PW + "@" + Config.sys_mongo + "/" + Config.mongo_db + "?authSource=admin";
app.use(session({
  store: new MongoStore({
    url: sessionMongoUrl,
  }),
  secret: "fujutimeNtp",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000 //过期时间
  }
}));

app.use(bodyParser.json({
  limit: "100mb"
}));
app.use(bodyParser.urlencoded({
  extended: false,
  limit: "100mb"
}))

mongoMorgan.token("userLogin", function getUserLogin(req) {
  return req.session ? req.session.userLogin : null;
});

mongoMorgan.token("param", function getUserLogin(req) {
  let p = "";
  if (req.method == "GET") {
    p = req.query.p;
  } else {
    p = req.body.p;
  }
  return p ? JSON.stringify(p) : "\"-\"";
});

mongoMorgan.token("date", function getUserLogin() {
  return Date.now();
});

mongoMorgan.token("date_format", function getUserLogin() {
  return new Date().toLocaleString();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', ejs.__express);
app.set('view engine', 'html'); //设置视图引擎

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//req.query.i为isbase64
app.use(function (req, res, next) {
  "use strict";
  if (req.method == "GET") {
    if (req.query.p && req.query.i == "1") {
      let b = new common.Base64();
      req.query.p = b.decode(decodeURIComponent(req.query.p));
    }
  } else {
    if (req.body.p && req.body.i == "1") {
      let b = new common.Base64();
      req.body.p = b.decode(decodeURIComponent(req.body.p));
    }
  }
  next();
});

//启用日志
let logMongoUrl = "mongodb://" + Config.sys_mongo + "/" + Config.log_db;
if (Config.hasUser) logMongoUrl = "mongodb://" + Config.DB_USER + ":" + Config.DB_PW + "@" + Config.sys_mongo + "/" + Config.log_db + "?authSource=admin";
app.use(mongoMorgan(logMongoUrl,
  "{\"ra\":\":remote-addr\",\"date\":\":date\",\"date_format\":\":date_format\",\"mt\":\":method\",\"url\":\":url\"," +
  "\"status\":\":status\",\"resLength\":\":res[content-length]\"," +
  "\"referrer\":\":referrer\",\"user_agent\":\":user-agent\",\"response-time\":\":response-time\"," +
  "\"login\":\":userLogin\",\"param\"::param}", {
    collection: "logs"
  }));

const ignoreList = [".exe", ".rar", ".docx", ".pptx", "/login/login", "/login/logout", "/login/getKey","getLoginPageEquipmentStatus"];
app.use(function (req, res, next) {
  console.log(req.session.userId)
  if (!req.session.userId) {
    let ignore = false;
    let url = req.originalUrl;
    for (let i = 0; i < ignoreList.length; ++i) {
      if (url.indexOf(ignoreList[i]) >= 0 || url === "/") {
        ignore = true;
        break;
      }
    }
    if (!ignore) {
      res.send({
        state: 3,
        value: "您未登录,请重新登录"
      });
      res.end();
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use("/login", loginRouter);
app.use('/', indexRouter);
routerMap.forEach(v => {
  app.use("/" + v.path, v.r);
});

// websocket.startWebsocket();
// ocr.tesseractPng2();

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
  if (err.status == 404) {
    res.render('404/404.html');
  } else {
    res.send("服务器500");
  }
});

module.exports = app;