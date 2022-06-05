let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, weight: 6.9, types: ['grass', 'poison']},
    {name: 'Charmander', height: 0.6, weight: 8.5, types: 'fire'},
    {name: 'Squirtle', height: 0.5, weight: 9, types: 'water'},
    {name: 'Pikachu', height: 0.4, weight: 6, types: 'Electric'},
    {name: 'Mewtwo', height: 2.0, weight: 122, types: 'Psychic'}
];

for (var i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + " height is "+ pokemonList[i].height + " m!");

    if(pokemonList[i].height > 1.7) {
      document.write("  This pokemon is tall.  Wow, that\'s big!" + "<br>");
    }else if(pokemonList[i].height > 1.0  && pokemonList[i].height < 1.7) {
      document.write("  This pokemon has an average height!" + "<br>");
    }else {
      document.write("  This pokemon is short!" + "<br>");
    }

}
