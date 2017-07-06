import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsRootModule } from 'ngx-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { SpinnerService } from './services/spinner.service';

import { rootReducer, IAppState, INITIAL_STATE } from './components/redux/store';
import { TableActions } from './components/redux/app.actions'; 

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';

import { TableService } from './services/table.service';
import { HttpService } from './services/http.service';
import { SorterComponent } from './components/sorter/sorter.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PageSizeSelectorComponent } from './components/page-size-selector/page-size-selector.component';
import { SearchComponent } from './components/search/search.component';
import { CreateEditFormComponent } from './components/create-edit-form/create-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SorterComponent,
    PaginatorComponent,
    PageSizeSelectorComponent,
    SearchComponent,
    CreateEditFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsRootModule,
    DataTableModule,
    NgReduxModule
  ],
  providers: [
    TableService,
    HttpService,
    TableActions,
    SpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE);
  }
}
