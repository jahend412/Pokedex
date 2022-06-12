
let pokemonRepository = (function () {  //  Entered the IIFE function and now the pokemonList is "protected"
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, weight: 6.9, types: ['Grass', 'Poison']},
    {name: 'Charmander', height: 0.6, weight: 8.5, types: 'Fire'},
    {name: 'Squirtle', height: 0.5, weight: 9, types: 'Water'},
    {name: 'Pikachu', height: 0.4, weight: 6, types: 'Electric'},
    {name: 'Mewtwo', height: 2.0, weight: 122, types: 'Psychic'}
  ];
function add(pokemon) {
  pokemonList.push(pokemon);
}

function getAll() {    //Added getAll function
  return pokemonList;
}

return {
  add: add,
  getAll: getAll    //Calling getAll function
};
})();

console.log(pokemonRepository.getAll());

pokemonRepository.add({ name: 'Onix', height: 8.8, weight: 210, types: 'Rock', 'Ground'});  //Added Onix to repository

console.log(pokemonRepository.getAll());

pokemonList.forEach(function(pokemon) {  // Added forEach loop
  document.write(pokemon.name, '(height: ' + pokemon.height +')');
    if(pokemonList[i].height > 1.7) {
    document.write("  This pokemon is tall.  Wow, that\'s big!" + "<br>");
    }else if(pokemonList[i].height > 1.0  && pokemonList[i].height < 1.7) {
    document.write("  This pokemon has an average height!" + "<br>");
    }else {
    document.write("  This pokemon is short!" + "<br>");
  }
});
