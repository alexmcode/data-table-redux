import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { Invoice } from '../../models/invoice';

@Injectable()
export class TableActions {
  static EDIT = 'EDIT';
  static CREATE = 'CREATE';
  static DELETE = 'DELETE';
  static INIT = 'INIT';

  edit(invoice: Invoice): Action {
      console.log("in edit action",invoice);
    return { 
        type: 
        { 
            action: TableActions.EDIT,
            data: invoice
        }
    };
  }

  create(invoice: Invoice): Action {
    return { 
        type: 
        { 
            action: TableActions.CREATE,
            data: invoice
        }
    };
  }

  init(invoices: Invoice[]): Action {
    return { 
        type: 
        { 
            action: TableActions.INIT,
            data: invoices
        }
    };
  }
  
  delete(invoices: Invoice[]): Action {
    return { 
        type: 
        { 
            action: TableActions.DELETE,
            data: invoices
        }
    };
  }

}