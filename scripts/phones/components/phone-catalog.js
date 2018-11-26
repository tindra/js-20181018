'use strict';

/*
{
    "age": 0,
    "id": "motorola-xoom-with-wi-fi",
    "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
    "name": "Motorola XOOM\u2122 with Wi-Fi",
    "snippet": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
  },
 */

export default class PhoneCatalog {
  constructor({ element, phones }) {
    this._element = element;
    this._phones = phones;

    this._render();
  }

  _render() {
    this._element.innerHTML = `
       <ul class="phones">
          ${ this._phones.map(phone => `
            <li class="thumbnail">
              <a href="#!/phones/${phone.id}" class="thumb">
                  <img alt="${phone.name}" src="${phone.imageUrl}">
              </a>

              <div class="phones__btn-buy-wrapper">
                  <a class="btn btn-success">
                      Add
                  </a>
              </div>

              <a href="#!/phones/${phone.id}">${phone.name}</a>
              <p>${phone.snippet}</p>
          </li>
          `).join('')}
        </ul>
    `;
  }
}
