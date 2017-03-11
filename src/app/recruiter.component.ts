import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GitHubService } from './github.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Observable } from 'rxjs/observable';
import { Applicant } from './applicant.model';

@Component({
  selector: 'recruiter',
  templateUrl: './admin-home.html',
  styleUrls: ['./app.component.css']
})
export class RecruiterComponent {
  title = 'app works!';
  apiEndPoint = 'SERVER_URL';
  applicantList: Array<Applicant> = [];
  constructor(private githubService: GitHubService){
      console.log("App Component is functioning");
  }
  entry(){
      this.applicantList.push(this.githubService.entry());
  }
}
