import { Component, Input, OnDestroy, SimpleChange, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { DataTable } from "angular2-datatable";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  criteria: string;
  private search: Subject<string> = new Subject();
  private subscription: Subscription;
  private inputData: any[];
  private mfTable: DataTable;

  ngOnInit() {
    this.subscription = this.search
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe((criteria) => this.filterDataByCriteria(criteria))
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }

  @Input()
  set data(data: any[]) {
    this.inputData = data;
    this.filterDataByCriteria(this.criteria);
  }

  @Input()
  set table(table: DataTable) {
    this.mfTable = table;
    this.filterDataByCriteria(this.criteria);
  }

  private filterDataByCriteria(criteria: string) {
    if(this.mfTable && this.inputData) {
      if(criteria && criteria.trim().length) {
        let tokens = criteria.split(' ').filter(t => t.length).map(t => t.toLowerCase());
        let properties = Object.getOwnPropertyNames(this.inputData[0]);
        let result = this.inputData.filter(item => {
          return tokens.every(token => {
            return properties.some(property => {
              let valueStr = (item[property] || '').toString().toLowerCase();
              return valueStr.includes(token);
            });
          });
        });
        this.setTableData(result);
      } else {
        this.setTableData(this.inputData);
      }
    }
  }

  private setTableData(data: any[]) {
    let change = new SimpleChange(this.mfTable.inputData, data, false);
    this.mfTable.ngOnChanges(<SimpleChanges>{ inputData: change });
  }

  criteriaChange() {
    this.search.next(this.criteria);
  }

}
