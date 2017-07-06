import { Action } from 'redux';
import { TableActions } from './app.actions';
import { Invoice } from '../../models/invoice';
import * as _ from 'lodash';

export interface IAppState {
  invoices: Invoice[];
}

export const INITIAL_STATE: IAppState = {
  invoices: []
};

export function rootReducer(lastState: IAppState, action: Action): IAppState {
  switch(action.type.action) {
    case TableActions.EDIT: 
        let newInvoices: Invoice[] = lastState.invoices
        .filter(
           el => {
               return el.internalNumber !== action.type.data.internalNumber
           } 
        );
        newInvoices.push(action.type.data);
        return { 
            invoices: newInvoices
        };
    case TableActions.CREATE:
        lastState.invoices.push(action.type.data);
        return {
             invoices:  lastState.invoices
        };
    case TableActions.DELETE:
        return {
            invoices: lastState.invoices
            .filter( 
                el => {
                    return !_.includes(action.type.data, el);
                }
            )
        };
    case TableActions.INIT:
        return {
            invoices:  Object.assign(lastState.invoices, action.type.data)
        }
  }

  return lastState;
}