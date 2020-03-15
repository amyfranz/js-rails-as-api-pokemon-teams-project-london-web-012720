const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector("main");
let i = 1;

const fetchItems = (url, option = {}) => {
  if (option === {}) {
    return fetch(url).then(res => res.json());
  } else {
    return fetch(url, option).then(res => res.json());
  }
};

const destroyPokemon = (pokemon, li) => {
  const option = { method: "DELETE" };
  fetchItems(`${POKEMONS_URL}/${pokemon.id}`, option).then(li.remove());
};

const createPokemon = (div, pokemon) => {
  const li = document.createElement("li");
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;
  const button = document.createElement("button");
  button.setAttribute("class", "Release");
  button.setAttribute("data-pokemon-id", pokemon.id);
  button.className = "release";
  button.innerText = "Release";
  li.append(button);
  div.children[2].append(li);
  button.addEventListener("click", () => {
    destroyPokemon(pokemon, li);
  }); //destroyPokemon(pokemon, li));
};

const findPokemonTrainer = pokemon => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    if (button.getAttribute("data-trainer-id") == pokemon.trainer_id) {
      createPokemon(button.parentElement, pokemon);
    }
  });
};

const setCards = trainer => {
  const div = document.createElement("div");
  div.className = "card";
  div.setAttribute("data-id", i);
  const p = document.createElement("p");
  p.innerText = trainer.name;
  const button = document.createElement("button");
  button.setAttribute("data-trainer-id", trainer.id);
  button.innerText = "Add Pokemon";
  const ul = document.createElement("ul");
  div.append(p, button, ul);
  main.append(div);
  button.addEventListener("click", () => {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trainer_id: trainer.id })
    };
    fetchItems(POKEMONS_URL, option).then(pokemon =>
      findPokemonTrainer(pokemon)
    );
  });
};

const init = () => {
  main.innerHTML = "";
  i = 0;
  fetchItems(TRAINERS_URL)
    .then(trainers => {
      trainers.forEach(trainer => {
        setCards(trainer);
      });
    })
    .then(
      fetchItems(POKEMONS_URL).then(pokemons =>
        pokemons.forEach(pokemon => findPokemonTrainer(pokemon))
      )
    );
};

init();
