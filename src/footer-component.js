import { LitElement, html, css } from 'lit';

class FooterComponent extends LitElement {
  static styles = css`
    footer {
      background-color: #1a2b42;
      color: white;
      padding: 1rem;
      text-align: center;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  `;

  render() {
    return html`
      <footer>
        <p>2024 My Lion App. All Rights Reserved.</p>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);
