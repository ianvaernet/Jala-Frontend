function savePokemon(event) {
  event.preventDefault();
  const id = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  const name = document.getElementById('pokemonNameInput').value;
  const image = document.getElementById('pokemonImageURLInput').value;
  const backgroundColor = document.getElementById('pokemonBackgroundColorInput').value;
  const color = document.getElementById('pokemonColorInput').value;
  const newPokemon = { id, name, backgroundColor, color, image };
  const customPokemons = JSON.parse(localStorage.getItem('customPokemons')) ?? [];
  customPokemons.push(newPokemon);
  console.log(customPokemons);
  localStorage.setItem('customPokemons', JSON.stringify(customPokemons));
  event.currentTarget.submit();
}

async function getPokemosnData() {
  const pokemonsData = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25')
    .then((response) => response.json())
    .then((pokemons) => {
      return pokemons.results.map(({ name }, index) => {
        const id = index + 1;
        const backgroundColor = pokemonColorMap[index + 1];
        const color = backgroundColor[1] === 'f' ? '#000' : '#fff';
        const image = getPokemonImageUri(index + 1);
        return { id, name, backgroundColor, color, image };
      });
    });
  const customPokemons = JSON.parse(localStorage.getItem('customPokemons'));
  if (customPokemons) pokemonsData.push(...customPokemons);
  return pokemonsData;
}

getPokemosnData().then((pokemons) => {
  pokemons.forEach(({ id, name, backgroundColor, color, image }) => {
    const card = document.createElement('pokemon-card');
    card.setAttribute('id', id);
    card.setAttribute('name', name);
    card.setAttribute('image', image);
    card.setAttribute('backgroundColor', backgroundColor);
    card.setAttribute('color', color);
    document.getElementById('pokedex').appendChild(card);
  });

  customElements.define('pokemon-card', PokemonCard);
});

// document.getElementById('addPokemonForm').onsubmit(savePokemon);
