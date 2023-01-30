//globais
let cards_container = document.getElementById('div_cards_dinamicos')
let filtro_descricao = document.getElementById('filtro_descricao')
let filtro_codigo = document.getElementById('filtro_id')
let txt_count_repositorios = document.getElementById('txt-count-repositorios')
let repositorios_cop;

//page load
window.onload = function() {
    repositorios_cop = repositorios
    txt_count_repositorios.textContent = repositorios_cop.length + ' Repositórios encontrados'
    draw_cards()
}

function draw_cards(){
    cards_container.innerHTML = ''
    repositorios_cop.forEach(repo => {
        
        let card = document.createElement("div")
        card.className = "col-3 d-flex flex-column d-flex align-items-center border-5 p-2 m-2 bg-white"
        card.setAttribute("onclick", "openRepo('"+repo.id+"')");
        card.setAttribute("style", "cursor: pointer")

        let icon = repo.name.includes('front') ? 'fa-brands fa-angular' : 'fa-brands fa-java';
        card.innerHTML = 
            `<div class="rounded-circle p-2 bg-cinza-claro m-2">
                    <i class="fa-xl fa-solid m-1 ${icon} color-transp-forte"></i>
                </div>
                <div class="d-flex justify-content-center mt-2 w-100" style="text-align:center;">
                    <h5>${repo.name}</h5>
            </div>`
        
        cards_container.appendChild(card)

    })
}

function openRepo(id){
    window.location.replace('/repositorios/'+id+'/detalhes')
}

filtro_descricao.addEventListener("keyup", event => {
    filtro()
})
filtro_codigo.addEventListener("keyup", event => {
    filtro()
})

function limpar_filtro(){
    filtro_codigo.value = ''
    filtro_descricao.value = ''
    filtro()
}

function filtro(){
    //reset 
    referencias_cop = referencias
    //filtro codigo
    if(filtro_codigo.value){
        referencias_cop = referencias_cop.filter( e=> {
            return e.id == parseInt(filtro_codigo.value)
        })
    }
    //filtro descricao
    if(filtro_descricao.value){
        referencias_cop = referencias_cop.filter( e=> {
            return  e.descricao.toUpperCase().includes(filtro_descricao.value.toUpperCase())
        })
    }

    if(!filtro_codigo.value && !filtro_descricao.value)
        referencias_cop = referencias
    
}