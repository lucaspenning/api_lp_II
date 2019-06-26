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

//Listar Produtos e Categorias
app.get("/home/listar/geral", function (request, response) {
    conexao.query("SELECT produtos.*, categorias.*" +
        "FROM produtos INNER JOIN categorias ON produtos.idCategorias = categorias.id;", function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(200).send(rows);
        });
});

//Listar Categorias
app.get("/produto/listar", function (request, response) {
    conexao.query("SELECT * FROM produtos", function (error, rows) {
        if (error) {
            response.status(500).send(error);
        }
        response.status(200).send(rows);
    });
});

//Inserir uma categoria
app.post("/produto/inserir", function (request, response) {
    conexao.query(
        "INSERT INTO produtos (idCategorias, descricaoProdutos) values ("+ 
        request.body.idCategorias + ",'" + request.body.descricao + "')",
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(201).send("Sucesso");
        });
});

// editando um produto
app.put("/produto/editar/:id", function (request, response) {
    conexao.query(
        "UPDATE produtos set descricaoProdutos = '" +
        request.body.descricao +
        "' where idProdutos = " + parseInt(request.params.id),
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(204).send("Sucesso");
        });
});

// apagando um produto
app.delete("/produto/delete/:idProdutos", function (request, response) {
    conexao.query(
        "DELETE from produtos where idProdutos = " + parseInt(request.params.idProdutos),
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(204).send("Sucesso");
        });
});

module.exports = app;