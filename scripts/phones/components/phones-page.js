'use strict';

import PhoneCatalog from './phone-catalog.js';
import PhoneViewer from './phone-viewer.js';
import PhoneSearch from './phone-search.js';
import PhoneSorting from './phone-sorting.js';
import ShoppingCart from './shopping-cart.js';

import PhoneService from '../services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initViewer();

    this._initCatalog();

    this._initSearch();

    this._initSorting();

    this._initCart();

    PhoneService.getPhones((phones) => {
      this._catalog.showPhones(phones);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalog.show();
    });

    this._viewer.on('add', event => {
      let phoneId = event.detail;
      this._cart.addItem(phoneId);
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.on('phoneSelected', event => {
      let phone = PhoneService.getPhone(event.detail.phoneId, (phone) => {
        this._catalog.hide();
        this._viewer.showPhone(phone);
      });
    });

    this._catalog.on('add', event => {
      let phoneId = event.detail;
      this._cart.addItem(phoneId);
    });
  }

  _initSearch() {
    this._search = new PhoneSearch({
      element: this._element.querySelector('[data-component="phone-search"]'),
    });

    this._search.on('search', event => {
      this._viewer.hide();
      let searchWords =  event.detail;
      let phones = PhoneService.getPhones((phones) => {
        this._catalog.searchPhones(phones, searchWords);
      });
    });
  }

  _initSorting() {
    this._sorting = new PhoneSorting({
      element: this._element.querySelector('[data-component="phone-sorting"]'),
    });

    this._sorting.on('sort', event => {
      let sortBy =  event.detail;
      let phones = PhoneService.getPhones((phones) => {
        this._catalog.showPhones(phones, sortBy);
      });
    });
  }

  _initCart() {
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _render() {
    this._element.innerHTML = `
       <div class="row">
        <!--Sidebar-->
        <div class="col-md-2">
            <section>
                <p data-component="phone-search"></p>

                <p data-component="phone-sorting"></p>
            </section>

           <section data-component="shopping-cart"></section>

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
