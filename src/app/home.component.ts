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
        resume: null
        };
  apiEndPoint = 'SERVER_URL';
  constructor(private github: GitHubService, private http: Http){
      console.log("App Component is functioning")
  }
  testing() {
      this.github.retrieveAllEvents('amichne').subscribe(data => {
          if (data){
              console.log(data);
          }
          else{
              console.log("Something isn't working");
          }
      })
  }
  onSubmit(){
      console.log("You entered", this.applicant.resume);
  }
  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions(headers);
        this.http.post(this.apiEndPoint, formData, options).map(res => res.json());
        }
    }
}
