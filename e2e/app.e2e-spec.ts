import { InvoiceTableAppPage } from './app.po';

describe('invoice-table-app App', () => {
  let page: InvoiceTableAppPage;

  beforeEach(() => {
    page = new InvoiceTableAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
