
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

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});



//        <!---------------------------  Modal -------------------------------->

  function showModal() {
    modalContainer.classList.add('is-visible');
  }

  document.querySelector('show-modal').addEventListener('click', () => {
    showModal();
  });

  function showModal(title, text) {
    modalContainer.innerHTML = '';  //Clear all existing modal content

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
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

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

})();
