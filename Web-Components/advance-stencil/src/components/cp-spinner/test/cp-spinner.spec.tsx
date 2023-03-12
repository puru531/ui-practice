import { newSpecPage } from '@stencil/core/testing';
import { CpSpinner } from '../cp-spinner';

describe('cp-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CpSpinner],
      html: `<cp-spinner></cp-spinner>`,
    });
    expect(page.root).toEqualHtml(`
      <cp-spinner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cp-spinner>
    `);
  });
});
