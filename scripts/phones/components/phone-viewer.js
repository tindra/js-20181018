import Component from '../../shared/component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', '.phone-thumbs li img', event => this._onImgClick(event));
    this.on('click', '[data-element="button-back"]', event => this._onBackClick(event));
    this.on('click', '[data-element="button-add"]', event => this._onCartClick(event));
  }

  showPhone(phone) {
    this._phone = phone;
    this._render();
    this._mainPhoneImg = this._element.querySelector('.phone');

    super.show();
  }

  _onImgClick(event) {
    let img = event.delegateTarget;
    this._mainPhoneImg.src = img.getAttribute('src');
  }

  _onBackClick(event) {
    this._trigger('back');
  }

  _onCartClick(event) {
    let phoneItem = event.delegateTarget;

    this._trigger('add', phoneItem.dataset.phoneId);
  }

  _render() {
    const { _phone: phone } = this;

    this._element.innerHTML = `
      <img class="phone" src="${phone.images[0]}">

    <button data-element="button-back">Back</button>
    <button data-element="button-add" data-phone-id="${phone.id}">Add to basket</button>


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
