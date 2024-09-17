import { expect, fixture, html } from '@open-wc/testing';
import '../src/footer-component.js';

describe('FooterComponent', () => {
  it('should render the footer', async () => {
    const element = await fixture(html`<footer-component></footer-component>`);
    const footer = element.shadowRoot.querySelector('footer');

    expect(footer).to.exist;
  });

  it('should display the correct text', async () => {
    const element = await fixture(html`<footer-component></footer-component>`);
    const footerText = element.shadowRoot.querySelector('footer p');

    expect(footerText).to.exist;
    expect(footerText.textContent).to.equal(
      '2024 My Lion App. All Rights Reserved.',
    );
  });

  it('should apply the correct styles', async () => {
    const element = await fixture(html`<footer-component></footer-component>`);
    const footer = element.shadowRoot.querySelector('footer');

    const computedStyle = getComputedStyle(footer);
    expect(computedStyle.backgroundColor).to.equal('rgb(26, 43, 66)');
    expect(computedStyle.color).to.equal('rgb(255, 255, 255)');
    expect(computedStyle.position).to.equal('fixed');
    expect(computedStyle.bottom).to.equal('0px');
  });
});
