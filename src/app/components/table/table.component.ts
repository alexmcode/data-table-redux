import { Component, ViewChild, DoCheck } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { TableService } from '../../services/table.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { SpinnerService } from '../../services/spinner.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements DoCheck {

  tableData: Invoice[] = [];
  rowsOnPage: number = 10;
  
  private checkedInvoices: Invoice[] = [];
  subscription;
  busy: boolean = false;

  @ViewChild('createEditModal') createEditModal;

  constructor(
    private tableService: TableService,
    private spinnerService: SpinnerService,
    private ngRedux: NgRedux<IAppState>,
  ) {
    // Refactor
    this.tableService.startLoadingInvoices();
    this.tableService.getInvoiceDataStream()
      .subscribe(
        (response: Invoice[]) => {
          this.tableService.init(response);
        }
      );

    this.subscription = ngRedux.select<Invoice[]>('invoices')
      .delay(2000)
      .subscribe(
        newInvoices => {
          this.tableData = newInvoices;
          this.spinnerService.setBusy(false);
        }
      );
  }

  ngDoCheck(){
    this.busy = this.spinnerService.getSpinnerStatus();
  }

  onAdd(event: { invoice: Invoice, action: string }) {
    this.spinnerService.setBusy(true);
    switch (event.action) {
      case 'create':
        this.tableService.createInvoice(event.invoice);
      case 'edit':
        this.tableService.editInvoice(event.invoice);
    }
  }
  
  deleteInvoices() {
    this.spinnerService.setBusy(true);    
    this.tableService.deleteInvoices(this.checkedInvoices);
  }

  editInvoice(invoice: Invoice) {
    this.openCreateEditModal();
    this.tableService.sendInvoiceItem(invoice);
  }

  onChange(invoice: Invoice) {
    this.modifySelectedInvoices(invoice);  
  }

  private modifySelectedInvoices(invoice: Invoice) {
    if (this.isIdInCheckedInvoices(invoice)) {
      this.removeFromSelectedOffers(invoice);
    } else {
      this.addInSelectedInvoices(invoice);
    }
  }

  private isIdInCheckedInvoices(invoice: Invoice): boolean {
    return _.includes(this.checkedInvoices, invoice);
  }

  private addInSelectedInvoices(invoice: Invoice) {
    this.checkedInvoices.push(invoice);
  }

  private removeFromSelectedOffers(invoice: Invoice) {
    let index = this.checkedInvoices.indexOf(invoice);
    this.checkedInvoices.splice(index, 1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  } 

  openCreateEditModal() {
    this.createEditModal.show();
  }

  onCancel() {
    this.createEditModal.hide();
  }

}
