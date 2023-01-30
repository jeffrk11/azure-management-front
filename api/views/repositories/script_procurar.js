//globais
let cards_container = document.getElementById('div_cards_dinamicos')
let filtro_texto = document.getElementById('filtro_texto')
let loading_icon = document.getElementById('loading-icon')
let notfound_icon = document.getElementById('notfound-icon')
let code_snipt = document.getElementById('code-snipt')

//page load
window.onload = function() {
    loading_icon.hidden = true
    notfound_icon.hidden = true
}

function draw_cards(){
    
}

function openRepo(id){
    //window.location.replace('/repositorios/'+id)
}

filtro_texto.addEventListener("keypress", event => {
    if (event.key === 'Enter'){
        console.log("pressed enter")
        loading_icon.hidden = false
        notfound_icon.hidden = true
        code_snipt.innerHTML = "";

        var raw = JSON.stringify({
        "searchText": filtro_texto.value
        });

        var requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        body: raw,
        redirect: 'follow'
        };

        fetch("/repositorios/procurar/event", requestOptions)
        .then(response => response.text())
        .then(result =>{
            //magic here
            loading_icon.hidden = true
            if(result === "[]")
                notfound_icon.hidden = false
            else
                append_snipts(result)
        })
        .catch(error => console.log('error', error));
        }
    })

function append_snipts(snipts){
    let results = JSON.parse(snipts)
    
    results.forEach(r => {
        let card = document.createElement("div")
        card.className = "row w-100 d-flex justify-content-center align-items-center"
        //codigos encontrados
        let pres = ""
        r.textsFinded.forEach( t =>{
            pres += `<pre class="">${t}</pre>`
        })
        card.innerHTML =
            `<div class="d-flex flex-column border-5 m-2 p-4 bg-white w-100">
                <div class="row no-gutters">
                    <div class="col-11">
                        <h4><b>${r.nameRepository}</b></h4>
                        <h5>Path: ${r.path}</h5>
                        <h5>Branch: ${r.branchs}</h5>
                    </div>
                    <div class="col-1 d-flex">
                        <a href="https://dev.azure.com/e-confy/Lomadee/_git/${r.idRepository}?path=${r.path}">
                            <i class="m-2 fa-solid fa-file-code" style="font-size: 30px; color: #f50057;"></i>
                        </a>
                        <a href="/repositorios/${r.idRepository}/detalhes">
                            <i class="m-2 fa-solid fa-code-branch" style="font-size: 30px; color: #f50057;"></i>
                        </a>
                    </div>
                </div>
                ${pres}
            </div>`
            code_snipt.appendChild(card)
    });

}

function limpar_filtro(){
    filtro_texto.value = ''
    filtro()
}

function filtro(){
    //reset 
    //filtro descricao
    if(filtro_texto.value){
        // referencias_cop = referencias_cop.filter( e=> {
        //     return  e.descricao.toUpperCase().includes(filtro_texto.value.toUpperCase())
        // })
    }

    if(!filtro_texto.value)
        console.log("")
    
} 