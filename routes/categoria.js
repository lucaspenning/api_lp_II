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
app.get("/categoria/lista", function (request, response) {
    conexao.query("SELECT * FROM categorias", function (error, rows) {
        if (error) {
            response.status(500).send(error);
        }
        response.status(200).send(rows);
    });
});

//Ler uma categoria especifica
app.get("/produto/categoria/:id", function (request, response) {
    conexao.query(
        "SELECT * FROM categorias where id = " + parseInt(request.params.id),
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            if (rows.length > 0) {
                response.status(200).send(rows);
            } else {
                response.status(404).send("Not Found");
            }
        });
});

//Inserir uma categoria
app.post("/categoria/inserir", function (request, response) {
    conexao.query(
        "INSERT INTO categorias (descricaoCategorias) values ('" +
        request.body.descricao +
        "')",
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(201).send("Sucesso");
        });
});

// editando uma categoria
app.put("/categoria/editar/:id", function (request, response) {
    conexao.query("UPDATE categorias set descricaoCategorias = '" +
        request.body.descricao + "' where id = " + parseInt(request.params.id),
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(204).send("Sucesso");
        });
});

// apagando uma categoria
app.delete("/categoria/delete/:id", function (request, response) {
    conexao.query("DELETE from categorias where id = " + parseInt(request.params.id),
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(204).send("Sucesso");
        });
});

module.exports = app;