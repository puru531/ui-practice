import { newSpecPage } from '@stencil/core/testing';
import { CpTooltip } from '../cp-tooltip';

describe('cp-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CpTooltip],
      html: `<cp-tooltip></cp-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <cp-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cp-tooltip>
    `);
  });
});
