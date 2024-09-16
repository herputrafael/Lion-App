import { LitElement, html } from 'lit';

class MainAppComponent extends LitElement {
  constructor() {
    super();
    this.header = 'My app';
  }

  render() {
    return html`Main Lion App 333`;
  }
}

customElements.define('main-app-component', MainAppComponent);
