
let pokemonRepository = (function () {  //  Entered the IIFE function and now the pokemonList is "protected"
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';
/* eslint-env jquery */

// Search Function
  const search = document.getElementById('pokemon-search');
    search.addEventListener('input', searchList);

    function searchList() {
      let searchInput = document.getElementById('pokemon-search').value;
      searchInput = searchInput.toLowerCase();
      const listItem = $('li');
      listItem.each(function () {
        const item = $(this);
        const name = item.text();
        if (name.includes(searchInput)) {
          item.show();
        } else {
          item.hide();
        }
      });
    }

  function add(pokemon) {   //Entered add function that declares typeof pokemon
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not correct');
    }
  }

  function getAll() {    //Added getAll function to get all pokemon
    return pokemonList;  //Return function takes the pokemon from the array
  }

  function addListItem(pokemon) {  // Function addListItem is used for DOM
    let pokemonList = document.querySelector('.pokemon-list');  //.pokemon-list is ul in index
    let pokemonItem = document.createElement('li');
    pokemonList.classList.add('group-list-item');
    pokemonList.classList.add('col-sm-4', 'col-md-6', 'col-lg-12');
    let buttonItem = document.createElement('button');  // creating a button
    buttonItem.classList.add('pokemonButton');
    buttonItem.innerText = pokemon.name;
    buttonItem.setAttribute('data-toggle', 'modal');
    buttonItem.setAttribute('data-target', '#pokemon-modal');
    $(buttonItem).addClass('button-class btn-block btn m1');
    pokemonItem.appendChild(buttonItem);  // calling the listpokemon to the button
    pokemonList.appendChild(pokemonItem);  // calling the pokemonList to the list
    buttonItem.addEventListener('click', function () {
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
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url). then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types.map((type) => type.type.name).join(',');
      pokemon.abilities = details.abilities.map((ability) => ability.ability.name).join(',');
    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(pokemon) {
   pokemonRepository.loadDetails(pokemon).then(function () {
       // console.log(item);
       showModal(pokemon);
   });
}

  //        <!---------------------------  Modal -------------------------------->


  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');


    modalTitle.empty();
    modalBody.empty();
    // Name
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    // Pokemon image
    let imageElement = $('<img class="pokemon-img">')
    imageElement.attr('src', pokemon.imageUrl);
    // Height
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
    // Weight
    let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');
    // Type
    let typeElement = $('<p>' + 'Types : ' + pokemon.types + '</p>');
    // Abilities
    let abilitiesElement = $('<p>' + 'Abilities : ' + pokemon.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);

  }

  return {
    add: add,         //Calling add function
    getAll: getAll,    //Calling getAll function
    addListItem: addListItem,  //Calling addListItem function
    loadList: loadList,
    showDetails: showDetails,
    loadDetails: loadDetails,
    search:  search

  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
