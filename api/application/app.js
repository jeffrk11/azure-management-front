const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express();
const path = require('path')

app.use(cors()) //habilitando cors na aplicacao

const frontRepository = require('../front/repositories/repository')
const frontSearch = require('../front/repositories/searchText')

//app.set('views', '../views');
app.use(express.static(path.join(__dirname,'/../views')))


app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: false})) //dados simples
app.use(bodyparser.json()) //apenas aceita json 


//rotas
app.use(frontRepository)
app.use(frontSearch)


// Quando não encontra rota, entra aqui:
app.use( (req, res, next) => {
const erro = new Error('não encontrado');
erro.status = 404;
next(erro);
});

app.use( (error, req, res, next) => {
    res.status(error.status || 500);
    return res.send ({
        erro: {
            mensagem: error.message,
            body: error.body
        }
    });
});

module.exports = app