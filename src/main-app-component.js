import { LitElement, html } from 'lit';

class MainAppComponent extends LitElement {
  constructor() {
    super();
    this.header = 'My app';
  }

  render() {
    return html`Main Lion App`;
  }
}

customElements.define('main-app-component', MainAppComponent);
