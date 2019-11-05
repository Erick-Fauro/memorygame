var baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
var background = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLTx9nqlhw0D6J544PYkTTmKBGZJbPmVM10Bpnm5rZzqlG3WTZ2Q&s";

var pokemonsSelecteds = [];

var pokemonList = [];

function createList () {
    for (var index = 1; index <= 10; index++) {
        pokemonList.push(`${baseUrl}${index}.png`);
    }
}

function checkIsRight(pokemon) {
    console.log(pokemonsSelecteds);
    if (pokemonsSelecteds.length === 0) {
        pokemonsSelecteds.push(pokemon);
        return;
    }
    var pokemon1 = pokemonsSelecteds[0];
    var pokemon2 = pokemon;
    setTimeout(function() {
        if (pokemon1.src !== pokemon2.src) {
            // desvirar cartas
            alert('pokemon errado');
            unshowCard(pokemon1);
            unshowCard(pokemon2);
        } else {
            alert('pokemon certo');
        }
        pokemonsSelecteds = [];
    }, 500);
}


function unshowCard(element) {
    element.src = element.getAttribute('data-background');
}

function showCard(event) {
    event.target.src = event.target.getAttribute('data-img');
    checkIsRight(event.target);
}

function createCardElement(pokemonUrl){
    var element = document.createElement("div");
    var imgElement = document.createElement("img");
    imgElement.src = background;
    imgElement.setAttribute('data-img', pokemonUrl);
    imgElement.setAttribute('data-background', background);
    element.appendChild(imgElement);
    element.className = "poke-card";
    element.addEventListener('click', showCard);
    var grid = document.getElementById("grid");
    grid.appendChild(element);
}

function sortList() {
    pokemonList.sort(function(a, b) { return (0.5 - Math.random()) })
}

function createGrid() {
    var grid = document.getElementById("grid");
    grid.innerHTML = "";
    sortList();
    populateGrid();
    setTimeout(() => {
        sortList();
        populateGrid();
    },        500);
}

function populateGrid() {
    for (var index = 0; index < pokemonList.length; index++) {
        var pokemonUrl = pokemonList[index];
        createCardElement(pokemonUrl);
    }
}

window.addEventListener('load', function() {
    createList();
    createGrid();
    var button = document.getElementById("start");
    button.addEventListener("click", function() {
        createGrid();
    });
});