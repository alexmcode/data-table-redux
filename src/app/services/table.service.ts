import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from './spinner.service';

import { NgRedux } from '@angular-redux/store';
import { TableActions } from '../components/redux/app.actions';
import { IAppState } from '../components/redux/store';

import { Invoice } from '../models/invoice';

@Injectable()
export class TableService {

  private localInvoicesJson: Invoice[] = [];

  private invoiceDataSource = new Subject<Invoice[]>();
  private invoiceDataStream = this.invoiceDataSource.asObservable();

  private invoiceItemSource = new Subject<Invoice>();
  private invoiceItemStream = this.invoiceItemSource.asObservable();

  private uri = {
    invoiceData: '/assets/invoices.json'
  };

  constructor(
    private http: HttpService,
    private spinnerService: SpinnerService,
    private ngRedux: NgRedux<IAppState>,
    private actions: TableActions
  ) {
    
  }

  startLoadingInvoices() {
    this.spinnerService.setBusy(true);
    this.http.request(this.uri.invoiceData)
      .delay(2000)
      .subscribe(
        (response: Invoice[]) => {
          this.localInvoicesJson = response;
          this.invoiceDataSource.next(response);
          this.spinnerService.setBusy(false);
        }
      );
  }

  getInvoiceDataStream(): Observable<Invoice[]> {
    return this.invoiceDataStream;
  }

  sendInvoiceItem(invoice: Invoice) {
    this.invoiceItemSource.next(invoice);
  }

  getInvoiceItemStream(): Observable<Invoice> {
    return this.invoiceItemStream;
  }

  init(invoices: Invoice[]) {
    this.ngRedux.dispatch(this.actions.init(invoices));    
  }

  editInvoice(invoice: Invoice) {
    this.ngRedux.dispatch(this.actions.edit(invoice));    
    console.log("edit ", invoice);
  }

  deleteInvoices(checkedInvoices: Invoice[]) {
    console.log("delete");
    this.ngRedux.dispatch(this.actions.delete(checkedInvoices));
  }

  createInvoice(invoice: Invoice) {
    this.ngRedux.dispatch(this.actions.create(invoice)); 
    console.log("create");
  }

}
