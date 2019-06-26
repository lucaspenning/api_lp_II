var express = require("express");
var router = express.Router();
var app= express();
var path= require("path");

app.get('/', function (request, response) {
	response.sendFile(path.join('F:/api/html/home.html'));
});

app.get('/categoria', function (request, response) {
	response.sendFile(path.join('F:/api/html/categoria.html'));
});

app.get('/produto', function (request, response) {
	response.sendFile(path.join('F:/api/html/produto.html'));
});
module.exports = app;