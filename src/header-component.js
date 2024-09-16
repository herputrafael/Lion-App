import { LitElement, html, css } from 'lit';

class HeaderComponent extends LitElement {
  static styles = css`
    header {
      background-color: #1a2b42;
      color: white;
      padding: 1rem;
      text-align: center;
    }
  `;

  render() {
    return html`
      <header>
        <h1>Welcome to Lion App Header</h1>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
