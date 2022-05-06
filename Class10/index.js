fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25')
  .then((response) => response.json())
  .then((pokemons) => console.log(pokemons.results));

dataPokemons.results.forEach((pokemon, index) => {
  const card = document.createElement('pokemon-card');
  card.setAttribute('id', index + 1);
  card.setAttribute('name', pokemon.name);
  card.setAttribute('image', getPokemonImageUri(index + 1));
  card.setAttribute('color', pokemonColorMap[index + 1]);
  document.getElementById('pokedex').appendChild(card);
});

customElements.define('pokemon-card', PokemonCard);
