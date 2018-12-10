import Component from '../../shared/component.js';

export default class PhoneSearch extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this.on('keyup', '[data-element="search-input"]', event => {
      let searchFor = event.delegateTarget.value;
      this._trigger('search', searchFor);
    });
  }

  _render() {
    this._element.innerHTML = `
      Search:
      <input data-element="search-input">
    `;
  }
}
