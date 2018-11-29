import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this._element.addEventListener('click', event => this._onImgClick(event));
  }

  showPhone(phone) {
    this._phone = phone;
    this._render();

    super.show();
  }

  _onImgClick(event) {
    let img = event.target.closest('.phone-thumbs li img');

    if (!img) return;

    this._element.querySelector('.phone').src = img.getAttribute('src');
  }

  _render() {
    const { _phone: phone } = this;

    this._element.innerHTML = `
      <img class="phone" src="${phone.images[0]}">

    <button data-element="back">Back</button>
    <button data-element="add-to-basket" data-phone-id="${phone.id}">Add to basket</button>


    <h1>${phone.name}</h1>

    <p>${phone.description}</p>

    <ul class="phone-thumbs">
    ${ phone.images.map(img => `
      <li>
        <img src="${img}">
      </li>
    `).join('')}
    </ul>
    `;
  }
}
