import { Component, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-create-edit-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.css']
})
export class CreateEditFormComponent {

  @Output() onAdd: EventEmitter<{ invoice: Invoice, action: string }> = new EventEmitter<{ invoice: Invoice, action: string }>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  createEditForm: FormGroup
  subscription;

  private formCurrentPurpose = 'create';

  constructor(
    private tableService: TableService
  ) {
    this.createForm();

    this.subscription = this.tableService.getInvoiceItemStream()
    .subscribe(
      (invoiceToEdit: Invoice) => {
        this.formCurrentPurpose = 'edit';
        console.log("item to edit populate", invoiceToEdit);
        this.populateForm(invoiceToEdit);
      }
    )
  }

  addChangeInvoice(ngForm: NgForm) {
    let newInvoice ={
      checked: false,
      internalNumber: ngForm.value.internalNumber,
      proFormaDate: ngForm.value.proFormaDate,
      finalDate: ngForm.value.finalDate,
      proFormaNo: ngForm.value.proFormaNo,
      finalNo: ngForm.value.finalNo,
      providerName: ngForm.value.providerName,
      activitiesValue: parseInt(ngForm.value.activitiesValue),
      grossTotal: parseInt(ngForm.value.grossTotal),
      invoiceStatus: ngForm.value.invoiceStatus,
      paymentStatus: ngForm.value.paymentStatus,
      paymentDueDate: ngForm.value.paymentDueDate
    }
    this.onAdd.emit({invoice: newInvoice, action: this.formCurrentPurpose});
    this.closeModal();
  }

  private resetFormCurrentPurpose() {
    if (this.formCurrentPurpose === 'edit') this.formCurrentPurpose = 'create';
  }

  closeModal() {
    this.onCancel.emit();
    this.resetForm();
  }

  private createForm() {
    this.createEditForm = new FormGroup({});

    this.createEditForm.addControl('internalNumber', new FormControl('', []));
    this.createEditForm.addControl('proFormaDate', new FormControl('', []));
    this.createEditForm.addControl('finalDate', new FormControl('', []));
    this.createEditForm.addControl('proFormaNo', new FormControl('', []));
    this.createEditForm.addControl('finalNo', new FormControl('', []));
    this.createEditForm.addControl('providerName', new FormControl('', []));
    this.createEditForm.addControl('activitiesValue', new FormControl('', []));
    this.createEditForm.addControl('grossTotal', new FormControl('', []));
    this.createEditForm.addControl('invoiceStatus', new FormControl('', []));
    this.createEditForm.addControl('paymentStatus', new FormControl('', []));
    this.createEditForm.addControl('paymentDueDate', new FormControl('', []));
  }

  private populateForm(invoiceToEdit: Invoice) {
    this.createEditForm.controls['internalNumber'].setValue(invoiceToEdit.internalNumber);
    this.createEditForm.controls['proFormaDate'].setValue(invoiceToEdit.proFormaDate);
    this.createEditForm.controls['finalDate'].setValue(invoiceToEdit.finalDate);
    this.createEditForm.controls['proFormaNo'].setValue(invoiceToEdit.proFormaNo);
    this.createEditForm.controls['finalNo'].setValue(invoiceToEdit.finalNo);
    this.createEditForm.controls['providerName'].setValue(invoiceToEdit.providerName);
    this.createEditForm.controls['activitiesValue'].setValue(invoiceToEdit.activitiesValue);
    this.createEditForm.controls['grossTotal'].setValue(invoiceToEdit.grossTotal);
    this.createEditForm.controls['invoiceStatus'].setValue(invoiceToEdit.invoiceStatus);
    this.createEditForm.controls['paymentStatus'].setValue(invoiceToEdit.paymentStatus);
    this.createEditForm.controls['paymentDueDate'].setValue(invoiceToEdit.paymentDueDate);
  }

  private resetForm() {
    this.createEditForm.controls['internalNumber'].setValue('');
    this.createEditForm.controls['proFormaDate'].setValue('');
    this.createEditForm.controls['finalDate'].setValue('');
    this.createEditForm.controls['proFormaNo'].setValue('');
    this.createEditForm.controls['finalNo'].setValue('');
    this.createEditForm.controls['providerName'].setValue('');
    this.createEditForm.controls['activitiesValue'].setValue('');
    this.createEditForm.controls['grossTotal'].setValue('');
    this.createEditForm.controls['invoiceStatus'].setValue('');
    this.createEditForm.controls['paymentStatus'].setValue('');
    this.createEditForm.controls['paymentDueDate'].setValue('');
    this.resetFormCurrentPurpose();
  }

}
