import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
  constructor({ element, onBackClicked }) {
    super({ element });

    this._onBackClicked = onBackClicked;

    this._element.addEventListener('click', event => this._onImgClick(event));
    this._element.addEventListener('click', event => this._onBackClick(event));
  }

  showPhone(phone) {
    this._phone = phone;
    this._render();
    this._mainPhoneImg = this._element.querySelector('.phone');

    super.show();
  }

  _onImgClick(event) {
    let img = event.target.closest('.phone-thumbs li img');

    if (!img) return;

    this._mainPhoneImg.src = img.getAttribute('src');
  }

  _onBackClick(event) {
    let backButton = event.target.closest('[data-element="back"]');

    if (!backButton) return;

    this._onBackClicked();
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
