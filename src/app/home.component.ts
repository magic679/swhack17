import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GitHubService } from './github.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Observable } from 'rxjs/observable';
import { Applicant } from './applicant.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./app.component.css']
})
export class HomeComponent {

  title = 'app works!';
  applicant: Applicant = { firstName: "",
        lastName: "",
        emailAddress: "",
        gitHubAccount: "",
        gitHubResponse: [],
        sortableStats: []
        };
  responseData: Array<any> = [];
  apiEndPoint = 'SERVER_URL';
  constructor(private github: GitHubService, private http: Http){
      console.log("App Component is functioning")
  }
  testing() {
      let count = 0;
      this.github.query(this.applicant.gitHubAccount, count).subscribe(data => {
          if (data){
              for (let d of data){
                  this.applicant.gitHubResponse.push(d);
              }
          }
          else {
              console.log("ERROR");
          }
      });
  }
  
  onSubmit(){
  }

}
