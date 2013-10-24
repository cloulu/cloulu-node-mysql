var http = require('http');
var util = require('util');

var conf = JSON.parse(process.env.VCAP_SERVICES);
var conf_mysql = conf['mysql-5.1'][0]['credentials'];

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : conf_mysql['hostname'],
  user     : conf_mysql['user'],
  password : conf_mysql['password'],
  database : conf_mysql['name']
});
connection.connect();

var port = process.env.VCAP_APP_PORT || 1337;
var host = process.env.VCAP_APP_HOST;

http.createServer(function (req, res) {
  connection.query("SELECT 1", function(err, rows, fields) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('result: ' + util.inspect(rows));
  });
}).listen(port, host);
