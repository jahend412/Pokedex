
let pokemonRepository = (function () {  //  Entered the IIFE function and now the pokemonList is "protected"
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, weight: 6.9, types: ['Grass', 'Poison']},
    {name: 'Charmander', height: 0.6, weight: 8.5, types: ['Fire']},
    {name: 'Squirtle', height: 0.5, weight: 9, types: ['Water']},
    {name: 'Pikachu', height: 0.4, weight: 6, types: ['Electric']},
    {name: 'Mewtwo', height: 2.0, weight: 122, types: ['Psychic']}
  ];

function add(pokemon) {   //Entered add function that declares typeof pokemon
    pokemonList.push(pokemon);
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
  listPokemon.appendchild(button);  // calling the listpokemon to the button
  pokemonList.appendChild(listpokemon);  // calling the pokemonList to the list
  eventListener(button, pokemon);  //  added eventListener with two parameters
}

function showDetails(pokemon) {  //Function for the event listener.
  console.log(pokemon);
}

function eventListener (button, pokemon) {  //eventListener has two parameters
  button.addEventListener('click', function (){  //the function uses the event listner by click and calls showDetails
    showDetails(pokemon);
  });
}



return {
  add: add,         //Calling add function
  getAll: getAll,    //Calling getAll function
  addListItem: addListItem  //Calling addListItem function
};
})();

console.log(pokemonRepository.getAll());

pokemonRepository.add({ name: 'Onix', height: 8.8, weight: 210, types: ['Rock', 'Ground']});  //Added Onix to repository

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);

}

)
