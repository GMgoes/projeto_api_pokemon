/*Referência à nossas tag's HTML com cada elemento que quisermos apresentar do pokemon*/
const nome_pokemon = encurtador('#nomePokemon');
const imagem_pokemon = encurtador('#imagemPokemon');
const fundo = encurtador('body');
const tipo = encurtador('#tipoPokemon');
const habilidades = encurtador('#habilidadesPokemon');
const icone_pagina = encurtador('#iconePagina');

//ID do nosso pokemon para consulta na API, que vem da inicialpage.html
const idDoPokemon = sessionStorage.idPokemon;

//Busca através da URL base da API junto do ID do pokemon à ser buscado, junto com toda a parte de requisição pra API
const urlDessePokemon = 'https://pokeapi.co/api/v2/pokemon/' + idDoPokemon;
const requestDoPokemon = new XMLHttpRequest();
requestDoPokemon.open('GET',urlDessePokemon);
requestDoPokemon.responseType = 'json';
requestDoPokemon.send();

/*Depois que a requisição estiver sido carregada, trazemos os atributos que quisermos sobre esse pokemon em especifico,
é nessa função também que definimos qual será a 'temática' (Plano de fundo) com base no tipo do pokemon, consultar css interno.*/
requestDoPokemon.onload = function retornaValores(){
    document.title = (requestDoPokemon.response.name).toUpperCase();
    imagem_pokemon.src = requestDoPokemon.response.sprites.versions['generation-v']['black-white'].animated.front_default;
    nome_pokemon.innerHTML += requestDoPokemon.response.name;
    tipo.innerHTML += requestDoPokemon.response.types[0].type.name;
    icone_pagina.href = requestDoPokemon.response.sprites.other.dream_world.front_default;
    for (let i = 0; i < requestDoPokemon.response.moves.length; i++) {
        habilidades.innerHTML += (requestDoPokemon.response.moves[i].move.name)+', ';
    }
    /*habilidades.innerHTML += ;*/
    switch(requestDoPokemon.response.types[0].type.name){
        case 'grass':
            fundo.id = requestDoPokemon.response.types[0].type.name;
            break;
        case 'fire':
            fundo.id = requestDoPokemon.response.types[0].type.name;
            break;
        case 'poison':
            fundo.id = requestDoPokemon.response.types[0].type.name;
            break;
        case 'electric':
            fundo.id = requestDoPokemon.response.types[0].type.name
            break;
        case 'water':
            fundo.id = requestDoPokemon.response.types[0].type.name;
            break;
        case 'bug':
            fundo.id = requestDoPokemon.response.types[0].type.name;
            break;
        case 'normal':
            fundo.id = 'bug';
            break;
        case 'rock':
            fundo.id = requestDoPokemon.response.types[0].type.name;
            break;
        case 'psychic':
            fundo.id = requestDoPokemon.response.types[0].type.name;
            break;
    }
    return null;
}

function encurtador(element) {
    return document.querySelector(element);
}
