import { expect, fixture, html } from '@open-wc/testing';
import '../src/lion-app.js';

describe('LionApp', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<lion-app></lion-app>`);
  });

  it('should render login-component initially', async () => {
    const loginComponent = element.shadowRoot.querySelector('login-component');
    expect(loginComponent).to.exist;

    const mainAppComponent =
      element.shadowRoot.querySelector('main-app-component');
    expect(mainAppComponent).to.not.exist;
  });

  it('should render main-app-component after login', async () => {
    element.dispatchEvent(
      new CustomEvent('login-success', {
        detail: {
          userData: {
            name: 'Test User',
            email: 'test@example.com',
          },
          token: 'mock-token',
        },
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;

    const loginComponent = element.shadowRoot.querySelector('login-component');
    expect(loginComponent).to.not.exist;

    const mainAppComponent =
      element.shadowRoot.querySelector('main-app-component');
    expect(mainAppComponent).to.exist;

    const welcomeMessage =
      mainAppComponent.shadowRoot.querySelector('.welcome-text');
    expect(welcomeMessage.textContent).to.include('Welcome, Test User');
  });

  it('should render login-component after logout', async () => {
    element.dispatchEvent(
      new CustomEvent('login-success', {
        detail: {
          userData: {
            name: 'Test User',
            email: 'test@example.com',
          },
          token: 'mock-token',
        },
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;

    element.dispatchEvent(
      new CustomEvent('logout-success', {
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;

    const loginComponent = element.shadowRoot.querySelector('login-component');
    expect(loginComponent).to.exist;

    const mainAppComponent =
      element.shadowRoot.querySelector('main-app-component');
    expect(mainAppComponent).to.not.exist;
  });
});
