const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')
const ejs = require('ejs');
const fetch = require('node-fetch');
const res = require('express/lib/response');
const { json } = require('express/lib/response');


router.get('/repositorios/listagem',(req,res,next) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let repositorios= [];
     fetch("http://localhost:8080/catalog/repositories", requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log(result)
            res.render(path.join(__dirname,'../../views/partials/esqueleto.ejs'), 
            {
                content: '../repositories/lista.ejs',
                repositorios: JSON.stringify(result)
                
            });
        })
        .catch(error => console.log('error', error));
})

router.get('/repositorios/:id/detalhes',(req,res,next) => {
    const id = req.params.id

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
     fetch("http://localhost:8080/catalog/repositories/"+id, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result))
            res.render(path.join(__dirname,'../../views/partials/esqueleto.ejs'), 
            {
                content: '../repositories/repositorio.ejs',
                repositorio: JSON.parse(result)
                
            });
        })
        .catch(error => console.log('error', error));
})



router.get('/repositorios/tetejef',(req,res,next) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
     fetch("localhost:8080/rest/financial/publisher-agreement?publisherId=22496346", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
        })
        .catch(error => console.log('error', error));
})

module.exports = router