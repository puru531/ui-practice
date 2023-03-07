import { newE2EPage } from '@stencil/core/testing';

describe('cp-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cp-tooltip></cp-tooltip>');

    const element = await page.find('cp-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
