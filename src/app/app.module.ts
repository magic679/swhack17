import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader';
import { AppComponent } from './app.component';
import { GitHubService } from './github.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2UploaderModule
  ],
  providers: [
      GitHubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
