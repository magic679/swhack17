import { Component } from '@angular/core';
import {GitHubService} from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private github: GitHubService){
      console.log("App Component is functioning")
  }
  testing() {
      this.github.queryTest().subscribe(data => {
          if (data){
              console.log(data);
          }
          else{
              console.log("Something isn't working");
          }
      })
  }
}
