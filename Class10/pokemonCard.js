class PokemonCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'closed' });
    const templateElem = document.getElementById('pokemonCardTemplate');
    const content = templateElem.content.cloneNode(true);

    content.querySelector('.card').style.backgroundColor = this.getAttribute('color');
    content.querySelector('img.image').setAttribute('src', this.getAttribute('image'));
    content.querySelector('.card>.name').innerText = this.getAttribute('name');

    shadow.appendChild(content);
  }
}
