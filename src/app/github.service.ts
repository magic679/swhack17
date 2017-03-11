import {Component, Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Applicant } from './applicant.model';

@Injectable()
@Component({
})
export class GitHubService {
	url = 'https://api.github.com/';

	QueryParam: {
		code: string,
		system: string,
		target: string
	} = {
		code: "",
		system: "",
		target: ""
	};
	applicant: Applicant = { firstName: "",
          lastName: "",
          emailAddress: "",
          gitHubAccount: "",
          resume: null
          };

	constructor(private http: Http) {
            console.log("GitHub Service is running");
    }

    queryTest(): Observable<any>{
        var headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');
        headers.append('Authorization', '2fe4824d7b435c10b52dbb755c1505d92473f2b4');
        return this.http.get(this.userURLCreation('amichne'), headers).map(res => res.json());
    }
    userURLCreation(name: string): string{
        var userUrl = this.url + 'users/' + name;
        return userUrl;
    }
	entry(){
        this.applicant.firstName = "Austin";
        this.applicant.lastName = "Michne";
        this.applicant.emailAddress = "Austinmichne@gmail.com";
        this.applicant.gitHubAccount = "amichne";
        return this.applicant;
    }

}
