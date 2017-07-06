import { Component, OnInit, Input } from '@angular/core';
import { DataTable, SortEvent } from "angular2-datatable";

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {

  sortOrder = '';
  @Input("by") sortBy: string;

  isSortedByMeAsc: boolean = false;

  public constructor(private mfTable: DataTable) {
    mfTable.onSortChange.subscribe((event: SortEvent) => {
      this.sortOrder = (event.sortBy === this.sortBy) ? event.sortOrder : '';
      this.isSortedByMeAsc = (event.sortBy === this.sortBy && event.sortOrder === 'asc');
    })
  }

  ngOnInit(): void {
    let tableSortBy = this.mfTable.sortBy;
    let tableSortOrder = this.mfTable.sortOrder;
    if(typeof tableSortBy === 'string') {
      this.sortOrder = (tableSortBy === this.sortBy) ? tableSortOrder : '';
      this.isSortedByMeAsc = this.sortBy === 'asc';
    }
  }

  sort() {
    if (this.isSortedByMeAsc) {
      this.mfTable.setSort(this.sortBy, 'desc');
    } else {
      this.mfTable.setSort(this.sortBy, 'asc');
    }
  }

}
