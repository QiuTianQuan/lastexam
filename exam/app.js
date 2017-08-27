var mysql = require('mysql');
var express = require('express')
var path = require('path')
var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tqymysql',
    port: '3306'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connect success!');
});

app.get('/ajaxget', function(req, res) {
    connection.query('SELECT * FROM `data`', function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log('send end!');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function() {
    console.log(' app listening on port 3000!');
});