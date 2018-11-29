export default class PhoneCart {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._cartList = this._element.querySelector('[data-element="cart-list"]');

    this._element.addEventListener('click', event => this._onCartItemClick(event));
  }

  addToCart(phoneId) {
    let existingCartItem = this._cartList.querySelector('[data-phone-id="' + phoneId + '"]');

    if (existingCartItem) {
      let existingCartItemAmount = existingCartItem.querySelector('[data-element="cart-item-amount"]');

      if (existingCartItemAmount) {
        existingCartItemAmount.innerHTML = +existingCartItemAmount.innerHTML + 1;
        return;
      }

      existingCartItem.insertAdjacentHTML('beforeend', ' <span>(<span data-element="cart-item-amount">2</span>)</span>');

      return;
    }

    let cartItem = document.createElement('li');
    cartItem.setAttribute('data-element', 'cart-item');
    cartItem.setAttribute('data-phone-id', phoneId);
    cartItem.innerHTML = phoneId;

    this._cartList.append(cartItem);
  }

  deleteFromCart(phoneId) {
    let cartItem = this._cartList.querySelector('[data-phone-id="' + phoneId + '"]');

    cartItem.remove();
  }

  _onCartItemClick(event) {
    let cartItem = event.target.closest('[data-element="cart-item"]');

    if (!cartItem) return;

    this.deleteFromCart(cartItem.dataset.phoneId);
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul data-element="cart-list"></ul>
    `;
  }
}
