import {Component, Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Applicant } from './applicant.model';

@Injectable()
@Component({
})
export class DataService {
	applicant = new Applicant;
	applicantList: Array<Applicant> = [];
	constructor(private http: Http) {
            console.log("Data Passing Service is running");
    }

}
