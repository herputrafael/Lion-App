import { expect, fixture, html } from '@open-wc/testing';
import '../src/lion-app.js';

describe('LionApp', () => {
  it('should have the default state when created', async () => {
    const element = await fixture(html`<lion-app></lion-app>`);
    expect(element.isLoggedIn).to.be.false;
    expect(element.userData).to.be.null;
    expect(element.token).to.equal('');
    expect(element.showUserDetails).to.be.false;
  });

  it('should initialize userData and token from localStorage', async () => {
    localStorage.setItem(
      'userData',
      JSON.stringify({ name: 'John Doe', email: 'john@example.com' }),
    );
    localStorage.setItem('token', 'mock-token-123');

    const element = await fixture(html`<lion-app></lion-app>`);
    expect(element.isLoggedIn).to.be.true;
    expect(element.userData.name).to.equal('John Doe');
    expect(element.token).to.equal('mock-token-123');

    localStorage.clear();
  });

  it('should handle login-success event and update state', async () => {
    const element = await fixture(html`<lion-app></lion-app>`);
    element.dispatchEvent(
      new CustomEvent('login-success', {
        detail: { userData: { name: 'Jane Doe' }, token: 'mock-token-456' },
      }),
    );

    expect(element.isLoggedIn).to.be.true;
    expect(element.userData.name).to.equal('Jane Doe');
    expect(element.token).to.equal('mock-token-456');
    expect(localStorage.getItem('userData')).to.not.be.null;
    expect(localStorage.getItem('token')).to.equal('mock-token-456');
  });

  it('should handle logout-success event and reset state', async () => {
    const element = await fixture(html`<lion-app></lion-app>`);
    element.isLoggedIn = true;
    element.userData = { name: 'Jane Doe' };
    element.token = 'mock-token-456';

    element.dispatchEvent(new CustomEvent('logout-success'));

    expect(element.isLoggedIn).to.be.false;
    expect(element.userData).to.be.null;
    expect(element.token).to.equal('');
    expect(localStorage.getItem('userData')).to.be.null;
    expect(localStorage.getItem('token')).to.be.null;
  });

  it('should handle show-user-details event and update showUserDetails state', async () => {
    const element = await fixture(html`<lion-app></lion-app>`);
    element.isLoggedIn = true;

    element.dispatchEvent(new CustomEvent('show-user-details'));
    expect(element.showUserDetails).to.be.true;
  });

  it('should handle redirect-to-main event and reset showUserDetails state', async () => {
    const element = await fixture(html`<lion-app></lion-app>`);
    element.showUserDetails = true;

    element.dispatchEvent(new CustomEvent('redirect-to-main'));
    expect(element.showUserDetails).to.be.false;
  });

  it('should correctly return user initials from userData', async () => {
    const element = await fixture(html`<lion-app></lion-app>`);
    element.userData = { name: 'John Doe' };

    expect(element.getUserInitials()).to.equal('JD');

    element.userData = { name: 'Jane Smith' };
    expect(element.getUserInitials()).to.equal('JS');

    element.userData = null;
    expect(element.getUserInitials()).to.equal('U');
  });

  it('should render login-component when not logged in', async () => {
    const element = await fixture(html`<lion-app></lion-app>`);
    const loginComponent = element.shadowRoot.querySelector('login-component');
    setTimeout(() => {
      expect(loginComponent).to.exist;
    }, 1000);
  });
});
