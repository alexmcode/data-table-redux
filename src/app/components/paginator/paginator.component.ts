import { Component, Input, ViewChild } from "@angular/core";
import { DataTable, Paginator } from "angular2-datatable";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  @Input("mfTable") mfTable: DataTable;
  @ViewChild(Paginator) paginator: Paginator;

  nextPage() {
    if(this.paginator.activePage < this.paginator.lastPage) {
      this.paginator.setPage(this.paginator.activePage + 1);
    }
  }

  prevPage() {
    if(1 < this.paginator.activePage) {
      this.paginator.setPage(this.paginator.activePage - 1);
    }
  }

}
