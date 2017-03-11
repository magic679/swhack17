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
	dbUrl = "https://um7sfkonal.execute-api.us-west-2.amazonaws.com/hack";
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
	currentCount = 0;
	constructor(private http: Http) {
            console.log("GitHub Service is running");
    }

	retrieveAllEvents(user: string): Observable<any>{
		this.query(this.currentCount, user).subscribe(data => {
			if (data.length > 0){
				this.http.post(this.dbUrl, data.json());
				this.currentCount++;
				this.retrieveAllEvents(user);
			}
			else{
				console.log("All user data recorded/Error occured");
				return this.http.get(this.dbUrl);
			}
		})
	}
    query(count: number, user: string): Observable<any>{
        var headers = new Headers();
        headers.append('Accept', 'application/vnd.github.cloak-preview');
        headers.append('Authorization', '2fe4824d7b435c10b52dbb755c1505d92473f2b4');
        return this.http.get(this.eventsURLCreation(user, String(count)), headers).map(res => res.json());
    }
    userURLCreation(name: string): string{
        var userUrl = this.url + 'users/' + name;
        return userUrl;
    }
	eventsURLCreation(name: string, pageNumber: string): string{
        var userUrl = this.url + 'users/' + name + "/events?page=" + pageNumber;
        return userUrl;
    }
	searchByRepoLanguage(user: string, language: string){
		var searchUrl = this.url + "search/repositories?q=+language:" + language + "+user:" + user;
		return searchUrl;
	}
	entry(){
        this.applicant.firstName = "Austin";
        this.applicant.lastName = "Michne";
        this.applicant.emailAddress = "Austinmichne@gmail.com";
        this.applicant.gitHubAccount = "amichne";
        return this.applicant;
    }

}
