import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public passData: any;
  constructor() { }

  setSharedData(data: any) {
    this.passData = data;
  }

  getSharedData(): any {
    return this.passData;
  }
}
