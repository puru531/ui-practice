import { newE2EPage } from '@stencil/core/testing';

describe('cp-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cp-spinner></cp-spinner>');

    const element = await page.find('cp-spinner');
    expect(element).toHaveClass('hydrated');
  });
});
