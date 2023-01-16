//Constante que representa a "Grande Div" que conterá nossas pokebolas
const pokesalao = encurtador('#listagem_por_grade');

let pagina_atual = 1;

let item_inicial = pagina_atual * 10 -10
let item_final = pagina_atual * 10 -1;

/*A constante que representará a nossa conexão com a API, startando em x elementos na chamada,
em seguida já faz a primeira requisição*/
const urlTodos = 'https://pokeapi.co/api/v2/pokemon?limit=1154&offset=0';
const request = new XMLHttpRequest();
request.open('GET', urlTodos);
request.responseType = 'json';
request.send();

//Quando carregado os dados de resposta pela API, chama a função listarPokemons para começarmos a listagem
request.onload = function (){
    const listagemDePokemons = request.response;
    listarPokemons(listagemDePokemons);
    criarBotoes();
}

function atualizaInformacoes(){
    item_inicial = pagina_atual * 10 -10
    item_final = pagina_atual * 10 -1;
    listarPokemons(request.response);
    criarBotoes();
    console.log(pagina_atual);
    console.log(item_inicial,item_final);
}
/*Essa é a função principal que lista nossos pokemon's que a API retornou,
ela também "chama" uma estrutura interna que nos traz uma informação importante de cada pokemon, a sua foto.*/
function listarPokemons(objetoPokemons){
    //Lista com todos os pokemon's e seus atributos (Nosso JSON completo)
    encurtador('#listagem_por_grade').innerHTML = "";
    const pokemons_listados = objetoPokemons['results'];
    const vetor_pokemons_cortado = pokemons_listados.slice(item_inicial,item_final);

    //Laço de repetição para percorrermos a estrutura que representa cada objeto (pokemon)
    for (let i = 0; i < vetor_pokemons_cortado.length; i++) {
        /*Criamos o elemento div que conterá nossa imagem e o nome do pokemon, atribuimos à ela a classe 'col-3',
        para que possamos organizar em forma de colunas (4 elementos por linha).*/
        let div_do_pokemon = document.createElement('div')
        div_do_pokemon.classList.add('col-4');
        let pokemonName = document.createElement('p');
        let imagemDoPokemon = document.createElement('img');

        /*Formatação do nome para não deixarmos tudo em letra minuscula. API só trabalha com os nomes em letra minuscula.
        Fazemos essa adequação mudando a primeira letra da nossa String para maiusculo e juntamos com o restante da String.*/
        let nome_formatado = vetor_pokemons_cortado[i].name;
        pokemonName.textContent = nome_formatado[0].toUpperCase() + nome_formatado.substring(1);

        /*Essa parte é onde fazemos a requisição novamente na API, mas desta vez vamos buscar um pokemon especifico
        (O que está na posição i no momento).*/
        let requestDoPokemon = new XMLHttpRequest();
        requestDoPokemon.open('GET',vetor_pokemons_cortado[i].url);
        requestDoPokemon.responseType = 'json';
        requestDoPokemon.send();

        /*Essa função nos possibilita recuperar a imagem do nosso pokemon selecionado, e também atribuimos à div que conterá os elementos, um id
        por ser sequencia, a nossa div tem o memso ID dos pokemons, isso vai ajudar futuramente quando precisarmos mandar para outra página*/
        requestDoPokemon.onload = function retornaURL(){
            imagemDoPokemon.src = requestDoPokemon.response.sprites.other.dream_world.front_default;
            div_do_pokemon.id = requestDoPokemon.response.id;
            return null;
        }

        //Quando o cliente clica na div, ele vai para a pagina_do_pokemon e leva numa sessionStorage o id do pokemon, salvo no atributo idPokemon
        imagemDoPokemon.addEventListener("click", function(){
            sessionStorage.idPokemon = div_do_pokemon.id;
            window.location.assign('pagina_do_pokemon.html');
        });

        /*Atribuimos à div_do_pokemon (nossa div das informações de cada pokemon), a imagem e o nome,
        em seguida anexamos ela ao pokesalao, que é a nossa section*/
        div_do_pokemon.appendChild(imagemDoPokemon);
        div_do_pokemon.appendChild(pokemonName);
        pokesalao.appendChild(div_do_pokemon);
    }
}

//Função que faz a nossa paginação/criação dos botões, tem que melhorar muito isso depois.
function criarBotoes(){
    encurtador('#paginacao').innerHTML = "";
        function botaoAnterior(){
            const calculo = pagina_atual-1;
            if(calculo > 1){
                let botao_anterior = document.createElement('a');
                let li_anterior = document.createElement('li');
                botao_anterior.classList.add('page-link');
                li_anterior.classList.add('page-item');
                botao_anterior.innerHTML = pagina_atual - 1;
                botao_anterior.addEventListener('click',()=>{
                    pagina_atual = pagina_atual -1;
                    atualizaInformacoes();
                });
                li_anterior.appendChild(botao_anterior);
                encurtador('#paginacao').appendChild(li_anterior);
            }
        };
        function botaoAtual(){
            let botao_atual = document.createElement('a');
            let li_atual = document.createElement('li');
            botao_atual.classList.add('page-link');
            li_atual.classList.add('page-item');
            botao_atual.innerHTML = pagina_atual;
            li_atual.appendChild(botao_atual);
            encurtador('#paginacao').appendChild(li_atual);
        };
        function botaoProximo(){
            const calculo = pagina_atual + 1
            if(calculo < 112){
                let botao_proximo = document.createElement('a');
                let li_proximo = document.createElement('li');
                botao_proximo.classList.add('page-link');
                li_proximo.classList.add('page-item');
                botao_proximo.innerHTML = pagina_atual + 1;
                botao_proximo.addEventListener('click',()=>{
                    pagina_atual = pagina_atual + 1;
                    atualizaInformacoes();
                });
                li_proximo.appendChild(botao_proximo);
                encurtador('#paginacao').appendChild(li_proximo); 
            }
        };
        
        botaoAnterior();botaoAtual();botaoProximo();
}
//Função para encurtar a busca de um elemento HTML
function encurtador(element) {
    return document.querySelector(element);
}