
let pokemonRepository = (function () {  //  Entered the IIFE function and now the pokemonList is "protected"
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=150';

  function add(pokemon) {   //Entered add function that declares typeof pokemon
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {    //Added getAll function to get all pokemon
    return pokemonList;  //Return function takes the pokemon from the array
  }

  function addListItem(pokemon) {  // Function addListItem is used for DOM
    let pokemonList = document.querySelector(".pokemon-list");  //.pokemon-list is ul in index
    let listPokemon = document.createElement("li");   // Creating listpokemon as a list
    let button = document.createElement("button");  // creating a button
    button.innerText = pokemon.name;   // creating text to be pokemon names for button
    button.classList.add("button-class");  // Having the button take on style from css
    listPokemon.appendChild(button);  // calling the listpokemon to the button
    pokemonList.appendChild(listPokemon);  // calling the pokemonList to the list
    eventListener(button, pokemon);  //  added eventListener with two parameters
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function eventListener (button, pokemon) {  //eventListener has two parameters
    button.addEventListener('click', function (){  //the function uses the event listner by click and calls showDetails
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url). then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.font_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {  //Function for the event listener.
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,         //Calling add function
    getAll: getAll,    //Calling getAll function
    addListItem: addListItem,  //Calling addListItem function
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

console.log(pokemonRepository.getAll());

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
