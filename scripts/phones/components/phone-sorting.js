import Component from '../../shared/component.js';

export default class PhoneSorting extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this.on('change', '[data-element="select"]', event => {
      let sortBy = event.delegateTarget.value;
      this._trigger('sort', sortBy);
    });
  }

  _render() {
    this._element.innerHTML = `
      Sort by:
      <select data-element="select">
        <option value="name">Alphabetical</option>
        <option value="age">Newest</option>
      </select>
    `;
  }
}
