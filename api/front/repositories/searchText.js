const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')
const ejs = require('ejs');
const fetch = require('node-fetch');
const res = require('express/lib/response');
const { json } = require('express/lib/response');


router.get('/repositorios/procurar',(req,res,next) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    res.render(path.join(__dirname,'../../views/partials/esqueleto.ejs'), 
            {
                content: '../repositories/procurar.ejs'
            });
})

router.post('/repositorios/procurar/event', (req,res, next) =>{
    const body = req.body
    console.log(body.searchText)

    var raw = JSON.stringify({
        "searchText": body.searchText
    });
    console.log(raw)
    var requestOptions = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: raw,
    redirect: 'follow'
    };
    
    fetch("http://localhost:8080/catalog/search", requestOptions)
    .then(response => response.text())
    .then(result =>{
        //magic here
        res.status(200).send(result)
    })
    .catch(error => console.log('error', error));
        
})

module.exports = router