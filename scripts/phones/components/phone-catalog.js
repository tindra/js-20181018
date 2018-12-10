import Component from '../../shared/component.js';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', '[data-element="phone-link"]', event => this._onPhoneClick(event));
    this.on('click', '[data-element="button-add"]', event => {
      let phoneItem = event.delegateTarget.closest('li')
      
      this._trigger('add', phoneItem.dataset.phoneId);
    });
  }

  _onPhoneClick(event) {
    let phoneLink = event.delegateTarget;

    this._trigger('phoneSelected', { phoneId: phoneLink.closest('.thumbnail').dataset.phoneId });
  }

  _compareValues(key) {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return;

      const valueA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const valueB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      return valueA > valueB ? 1 : -1;
    };
  }

  showPhones(phones, sortBy = 'name') {
    this._phones = phones;
    this._phones.sort(this._compareValues(sortBy));
    this._render();
    this.show();
  }

  searchPhones(phones, searchFor) {
    let searchWord = searchFor.toUpperCase();
    this._phones = phones.filter(phone => phone.name.toUpperCase().includes(searchWord));
    this._render();
    this.show();
  }

  _render() {
    this._element.innerHTML = `
       <ul class="phones">
          ${ this._phones.map(phone => `
            <li class="thumbnail" data-phone-id="${phone.id}">
              <a data-element="phone-link" href="#!/phones/${phone.id}" class="thumb">
                  <img alt="${phone.name}" src="${phone.imageUrl}">
              </a>

              <div class="phones__btn-buy-wrapper">
                  <a class="btn btn-success" data-element="button-add">
                      Add
                  </a>
              </div>

              <a data-element="phone-link" href="#!/phones/${phone.id}">${phone.name}</a>
              <p>${phone.snippet}</p>
          </li>
          `).join('')}
        </ul>
    `;
  }
}
