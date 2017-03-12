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
	applicant = new Applicant;
	listOfResponses: Array<any> = [];
	constructor(private http: Http) {
            console.log("GitHub Service is running");
    }
    eventsQuery(user: string, count: number): Observable<any>{
        var headers = new Headers();
        headers.append('Accept', 'application/vnd.github.cloak-preview');
        headers.append('Authorization', '2fe4824d7b435c10b52dbb755c1505d92473f2b4');
        return this.http.get(this.eventsURLCreation(user, String(count)), headers).map(res => res.json());
    }
	repoQuery(user: string): Observable<any>{
        var headers = new Headers();
        headers.append('Accept', 'application/vnd.github.cloak-preview');
        headers.append('Authorization', '2fe4824d7b435c10b52dbb755c1505d92473f2b4');
        return this.http.get(this.repoURLCreation(user), headers).map(res => res.json());
    }
	userMetaQuery(user: string): Observable<any>{
        var headers = new Headers();
        headers.append('Accept', 'application/vnd.github.cloak-preview');
        headers.append('Authorization', '2fe4824d7b435c10b52dbb755c1505d92473f2b4');
        return this.http.get(this.metaDataURLCreation(user), headers).map(res => res.json());
    }
    repoURLCreation(name: string): string{
        var userUrl = this.url + 'users/' + name + "/repos";
        return userUrl;
    }
	metaDataURLCreation(name: string): string{
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
