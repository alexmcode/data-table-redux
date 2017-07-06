import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpinnerService {

  private busy: boolean = false;

  public getSpinnerStatus(): boolean {
    return this.busy;
  }

  public setBusy(busy: boolean) {
    this.busy = busy;
  }
}
