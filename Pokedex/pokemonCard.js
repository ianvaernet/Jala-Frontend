class PokemonCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'closed' });
    const templateElem = document.getElementById('pokemonCardTemplate');
    const content = templateElem.content.cloneNode(true);

    content.querySelector('.card').style.backgroundColor = this.getAttribute('backgroundColor');
    content.querySelector('img.image').setAttribute('src', this.getAttribute('image'));
    const name = content.querySelector('.card>.name');
    name.innerText = this.getAttribute('name');
    name.style.color = this.getAttribute('color');

    shadow.appendChild(content);
  }
}
