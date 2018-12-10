import Component from '../../shared/component.js';
import * as helper from '../../shared/helpers.js';

export default class PhoneSearch extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._debouncedTrigger = helper.debounce(this._trigger, 500);

    this.on('keyup', '[data-element="search-input"]', event => {
      let searchWords = event.delegateTarget.value;
      this._debouncedTrigger('search', searchWords);
    });
  }

  _render() {
    this._element.innerHTML = `
      Search:
      <input data-element="search-input">
    `;
  }
}
