import { Component, Input, SimpleChange, SimpleChanges } from "@angular/core";
import { DataTable } from "angular2-datatable";

const DEFAULT_SIZES_SET = [ 10, 20, 40, 100 ];

@Component({
  selector: 'app-page-size-selector',
  templateUrl: './page-size-selector.component.html',
  styleUrls: ['./page-size-selector.component.css']
})
export class PageSizeSelectorComponent {

  all: number = 1000000000;
  rowsOnPageSet: number[] = DEFAULT_SIZES_SET;
  rowsOnPage: number = this.rowsOnPageSet[0];

  private mfTable: DataTable;

  @Input()
  set table(table: DataTable) {
    this.mfTable = table;
    this.setPageSize();
  }

  setPageSize() {
    if(!this.mfTable) return;
    let change = new SimpleChange(this.mfTable.rowsOnPage, this.rowsOnPage, false);
    this.mfTable.ngOnChanges(<SimpleChanges>{ rowsOnPage: change });
  }

}
