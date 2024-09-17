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
    return html`<div class="welcome-text">
      Welcome, ${this.user?.name ? this.user.name : 'Guest'}!
    </div>`;
  }
}

customElements.define('main-app-component', MainAppComponent);
