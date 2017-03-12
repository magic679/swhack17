import {Component, Injectable} from '@angular/core';
import {Http} from '@angular/http'

@Injectable()
@Component({})
export class DataStoreService {

  data;

  constructor(private http: Http) {
    this.readData('/data/sampleData.txt');
    this.readData('/data/sampleData2.txt');
    this.readData('/data/sampleData3.txt');
  }

  getData() {
    return this.data;
  }

  private readData(fileLocation: string) {
    this.http.get(fileLocation)
      .map(resp => resp.json())
      .subscribe(
        resp => {
          if (this.data) {
            this.data = this.data.concat(resp);
          } else {
            this.data = resp;
          }
        },
        err => console.log(err)
      );
  }
}
