import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GitHubService } from './github.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Observable } from 'rxjs/observable';
import { Applicant } from './applicant.model';
import { DataService } from './data.service';

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
        repoList: [],
        metaDataList: []
        };
  responseData: Array<any> = ["1"];
  count = 0;
  constructor(private github: GitHubService, private http: Http, private dataService: DataService){
      console.log("App Component is functioning")
  }
  onSubmit() {
    this.github.eventsQuery(this.applicant.gitHubAccount, this.count).subscribe(data => {
          if (data){
              for (let d of data){
                  this.applicant.gitHubResponse.push(d);
              }
              console.log(this.applicant.gitHubResponse);
              if (data.length != 0){
                  this.count++;
                  this.onSubmit();
              }
              if (data.length == 0){
                  let clone = Object.assign({}, this.applicant);
                  this.dataService.applicantList.push(clone);
                  console.log(this.dataService.applicantList);
              }
          }
          else {
              console.log("ERROR");
          }
    });
    this.github.repoQuery(this.applicant.gitHubAccount).subscribe(data => {
        if (data){
            for (let d of data){
                this.applicant.repoList.push(d);
            }
            console.log(this.applicant.repoList);
            let clone1 = Object.assign({}, this.applicant);
            this.dataService.applicantList.push(clone1);
            console.log(this.dataService.applicantList);
        }
        else{
            console.log("RepoQuery Error");
        }
    });
    this.github.userMetaQuery(this.applicant.gitHubAccount).subscribe(data => {
        if (data){
            for (let d of data){
                this.applicant.metaDataList.push(d);
            }
            console.log(this.applicant.metaDataList);
            let clone2 = Object.assign({}, this.applicant);
            this.dataService.applicantList.push(clone2);
            console.log(this.dataService.applicantList);
        }
        else{
            console.log("RepoQuery Error");
        }
    });


  }
  saveResults(datat: Applicant){

      this.count = 0;
      this.dataService.applicantList.push(this.applicant);
      console.log(this.dataService.applicantList);
  }
}
