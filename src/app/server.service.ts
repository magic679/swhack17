import {Component, Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
@Component({
})
export class GitHubService {
	url = 'MONGO_DB_URL';

	constructor(private http: Http) {
            console.log("MongoDB connection is functioning...");
    }

    fullQuery(){
		return this.http.get(this.url).map(res => res.json());
	}

}
