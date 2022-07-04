
let pokemonRepository = (function () {  //  Entered the IIFE function and now the pokemonList is "protected"
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
    let listItem = document.createElement("li");   // Creating listpokemon as a list
    let button = document.createElement("button");  // creating a button
    button.innerText = pokemon.name;   // creating text to be pokemon names for button
    button.classList.add("pokemonButton");  // Having the button take on style from css
    listItem.appendChild(button);  // calling the listpokemon to the button
    pokemonList.appendChild(listItem);  // calling the pokemonList to the list
    button.addEventListener("click", function (event) {
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
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
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

      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

//pokemon name
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
// Height
      let contentElement = document.createElement('p');
      contentElement.innerText = "Height: " +pokemon.height;

      // Add image,  So far this isnt adding an image and needs to be fixed!
      let pokemonImage = document.createElement("img");
      pokemonImage.classList.add('pokemon-image');
      pokemonImage.src = pokemon.imageUrl;


      modal.appendChild(closeButtonElement);
      modal.appendChild(pokemonImage)
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);


      modalContainer.classList.add('is-visible');
    }

    //A way to close the Modal function
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    //  Event listener for Modal
    window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  return {
    add: add,         //Calling add function
    getAll: getAll,    //Calling getAll function
    addListItem: addListItem,  //Calling addListItem function
    loadList: loadList,
    showDetails: showDetails,
    loadDetails: loadDetails

  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
