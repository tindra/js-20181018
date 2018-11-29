'use strict';

import PhoneCatalog from './phone-catalog.js';
import PhoneViewer from './phone-viewer.js';
import PhoneCart from './phone-cart.js';

import PhoneService from '../services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initViewer();

    this._initCatalog();

    this._initCart();

    this._element.addEventListener('click', event => this._onAddToCartClick(event));
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
      onBackClicked: () => {
        this._catalog.show();
        this._viewer.hide();
      },
    })
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
      onPhoneSelected: (phoneId) => {
        let phone = PhoneService.getPhone(phoneId);

        this._catalog.hide();
        this._viewer.showPhone(phone);
      },
    })
  }

  _initCart() {
    this._cart = new PhoneCart({
      element: this._element.querySelector('[data-component="phone-cart"]'),
    })
  }

  _onAddToCartClick(event) {
    let button = event.target.closest('[data-element="add-to-basket"]');

    if (!button) return;

    this._cart.addToCart(button.dataset.phoneId);
  }

  _render() {
    this._element.innerHTML = `
       <div class="row">
        <!--Sidebar-->
        <div class="col-md-2">
            <section>
                <p>
                    Search:
                    <input>
                </p>

                <p>
                    Sort by:
                    <select>
                        <option value="name">Alphabetical</option>
                        <option value="age">Newest</option>
                    </select>
                </p>
            </section>

           <section data-component="phone-cart"></section>

        </div>

        <!--Main content-->
        <div class="col-md-10">
           <div data-component="phone-catalog"></div>
           <div data-component="phone-viewer" class="js-hidden"></div>
        </div>
    </div>
    `;
  }
}
