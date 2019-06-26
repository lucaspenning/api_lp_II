var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var index = require("./routes/index");
var produto = require("./routes/produto");
var categoria = require("./routes/categoria");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", index);
app.use("/", produto);
app.use("/", categoria);

app.listen(3000, function () {
	console.log("Servidor rodando! Acesse: http://localhost:3000");
});