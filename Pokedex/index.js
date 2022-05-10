fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25')
  .then((response) => response.json())
  .then((pokemons) => {
    pokemons.results.forEach((pokemon, index) => {
      const card = document.createElement('pokemon-card');
      const backgroundColor = pokemonColorMap[index + 1];
      const color = backgroundColor[1] === 'f' ? '#000' : '#fff';
      card.setAttribute('id', index + 1);
      card.setAttribute('name', pokemon.name);
      card.setAttribute('image', getPokemonImageUri(index + 1));
      card.setAttribute('backgroundColor', backgroundColor);
      card.setAttribute('color', color);
      document.getElementById('pokedex').appendChild(card);
    });

    customElements.define('pokemon-card', PokemonCard);
  });
