import { LitElement, html, css } from 'lit';

class UserDetailsComponent extends LitElement {
  static properties = {
    user: { type: Object },
  };

  constructor() {
    super();
    this.user = {};
  }

  static styles = css`
    .user-details {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
      width: 300px;
      position: relative;
    }

    .back-button {
      position: absolute;
      padding-bottom: 2px;
      top: 10px;
      right: 10px;
      background: none;
      border: 1px solid black;
      border-radius: 20%;
      cursor: pointer;
      font-size: 18px;
      color: #1a2b42;
    }

    .back-button:hover {
      color: #f44336;
    }
  `;

  _goBack() {
    this.dispatchEvent(
      new CustomEvent('back-to-main', { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <div class="user-details">
        <button class="back-button" @click=${this._goBack}>&#8592;</button>
        <h2>User Details</h2>
        <p>Name: ${this.user?.name}</p>
        <p>Email: ${this.user?.email}</p>
        <p>Adress: ${this.user?.adress}</p>
        <p>Phone: ${this.user?.phone}</p>
      </div>
    `;
  }
}

customElements.define('user-details-component', UserDetailsComponent);
