import { expect, fixture, html } from '@open-wc/testing';
import '../src/user/user-details-component.js';

describe('UserDetailsComponent', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(
      html`<user-details-component
        .user=${{
          name: 'John Doe',
          email: 'john.doe@example.com',
          adress: '1234 Elm Street',
          phone: '555-555-5555',
        }}
      ></user-details-component>`,
    );
  });

  it('should render user details', () => {
    const userDetails = element.shadowRoot.querySelector('.user-details');
    expect(userDetails).to.exist;

    const name = element.shadowRoot.querySelector('p:nth-child(3)').textContent;
    const email =
      element.shadowRoot.querySelector('p:nth-child(4)').textContent;
    const adress =
      element.shadowRoot.querySelector('p:nth-child(5)').textContent;
    const phone =
      element.shadowRoot.querySelector('p:nth-child(6)').textContent;

    expect(name).to.equal('Name: John Doe');
    expect(email).to.equal('Email: john.doe@example.com');
    expect(adress).to.equal('Adress: 1234 Elm Street');
    expect(phone).to.equal('Phone: 555-555-5555');
  });

  it('should have a back button', () => {
    const backButton = element.shadowRoot.querySelector('.back-button');
    expect(backButton).to.exist;
  });

  it('should trigger the back-to-main event when back button is clicked', async () => {
    let backEventTriggered = false;

    element.addEventListener('back-to-main', () => {
      backEventTriggered = true;
    });

    const backButton = element.shadowRoot.querySelector('.back-button');
    backButton.click();

    expect(backEventTriggered).to.be.true;
  });
});
