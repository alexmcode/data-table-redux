import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Invoice } from '../models/invoice';

@Injectable()
export class HttpService {

  constructor(
    private http: Http
  ) { }

  private extractData(response: any) {
    if (response._body) {
      return response.json();
    }
    return
  }

  request(url: string): Observable<Invoice[]> {
    return this.http.request(url, null)
      .map( response => this.extractData(response));
  }

}
