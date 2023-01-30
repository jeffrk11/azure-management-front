//globais
let repositorio_cop = repositorio
    //ambientes 
let ambiente_dev_liveness = document.getElementById("ambiente_dev_liveness")
let ambiente_hml_liveness = document.getElementById("ambiente_hml_liveness")
let ambiente_prd_liveness = document.getElementById("ambiente_prd_liveness")
let ambiente_dev_readiness = document.getElementById("ambiente_dev_readiness")
let ambiente_hml_readiness = document.getElementById("ambiente_hml_readiness")
let ambiente_prd_readiness = document.getElementById("ambiente_prd_readiness")

//page load
window.onload = function() {
    setHealth()
}

function setHealth(){
    
    if(repositorio_cop?.liveness){
        setStatusByUrl(ambiente_dev_liveness,'fa-solid fa-heart','https://'+repositorio_cop.url_dev+repositorio_cop.liveness)
        setStatusByUrl(ambiente_hml_liveness,'fa-solid fa-heart','https://'+repositorio_cop.url_hml+repositorio_cop.liveness)
        setStatusByUrl(ambiente_prd_liveness,'fa-solid fa-heart','https://'+repositorio_cop.url_prd+repositorio_cop.liveness)
    }
    if(repositorio_cop?.readiness){
        setStatusByUrl(ambiente_dev_readiness,'fa-solid fa-rocket','https://'+repositorio_cop.url_dev+repositorio_cop.readiness)
        setStatusByUrl(ambiente_hml_readiness,'fa-solid fa-rocket','https://'+repositorio_cop.url_hml+repositorio_cop.readiness)
        setStatusByUrl(ambiente_prd_readiness,'fa-solid fa-rocket','https://'+repositorio_cop.url_prd+repositorio_cop.readiness)
    }
}

function setStatusByUrl(element,icon,url){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(url, requestOptions)
    .then(response =>{
        if(response.status == 200)
            element.style.color = '#2fb32f'
        else
            element.style.color = '#d0dbd0'
        
        element.className = icon
        })
    .catch(error => {
        element.className = icon
        element.style.color = '#d0dbd0'
    });
}