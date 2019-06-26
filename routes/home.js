var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var app = express();

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "lucas",
    database: "produtos"
});

conexao.connect();

//Listar Categorias
app.get("/home/listar", function (request, response) {
    conexao.query("SELECT produtos.*, categorias.*" +
        "FROM produtos INNER JOIN categorias ON produtos.idCategorias = categorias.id;", function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(200).send(rows);
        });
});