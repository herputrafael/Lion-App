import { LitElement, html, css } from 'lit';

class MainAppComponent extends LitElement {
  static styles = css``;

  render() {
    return html`
      <div>
        <h1>Welcome to My Lion App</h1>
        <div></div>
      </div>
    `;
  }
}

customElements.define('main-app-component', MainAppComponent);
