import { LitElement, html } from 'lit';

class MainAppComponent extends LitElement {
  static properties = {
    user: { type: Object },
  };

  constructor() {
    super();
    this.user = {};
  }

  render() {
    return html` Welcome, ${this.user?.name ? this.user.name : 'Guest'}! `;
  }
}

customElements.define('main-app-component', MainAppComponent);
