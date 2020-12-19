let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let dbconfig = require("../config/db_con");
let moment = require("moment")
var sanitizeHtml = require('sanitize-html');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/api/write', function (req, res, next) {
  let d_line = sanitizeHtml(req.body.line);
  let d_date = moment().format('YY.MM.DD h시 mm분');
  let d_author = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (d_line && d_date && d_author) {
    if (d_line.len > 300) {res.send({status: "err", reason: "ERR_LINE_SO_LONG"});
  } else if (d_line.len == 0) {res.send({status: "err", reason: "ERR_LINE_IS_EMPTY"});
  } else {
    let connection = mysql.createConnection(dbconfig);
    connection.connect();
    connection.query("INSERT INTO lines (line, created, author) VALUE (?, ?, ?);", [d_line, d_date, d_author], function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send({
          status: "err",
          reason: "ERR_UNKNOWN"
        })
      } else {
        res.send({
          status: "OK",
          data: {
            line: d_line,
            date: d_date
          }
        })
      }
    }
    );

    connection.end();
  }
  } else {
    res.send({status: "err", reason: "ERR_CHECK_REQUEST"});
  }
});

router.post('/api/read', function (req, res, next) {
  let connection = mysql.createConnection(dbconfig);
  connection.connect();
  connection.query("SELECT id, line, created FROM lines ORDER BY id DESC limit 1000;",  function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send({
        status: "ERR",
        reason: error
      })
    } else {
      res.send({
        status: "OK",
        data : results
      })
    }
  }
  );
  connection.end();
});



module.exports = router;
