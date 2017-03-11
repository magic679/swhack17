import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GitHubService } from './github.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./app.component.css']
})
export class RecruiterComponent {
  title = 'app works!';
  applicant: {
      firstName: string;
      lastName: string;
      emailAddress: string;
      gitHubAccount: string;
      resume: File;
  } = { firstName: "",
        lastName: "",
        emailAddress: "",
        gitHubAccount: "",
        resume: null
        };
  apiEndPoint = 'SERVER_URL';
  constructor(private github: GitHubService, private http: Http){
      console.log("App Component is functioning")
  }
  
}
