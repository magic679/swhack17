import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { RecruiterComponent } from './recruiter.component';

import { GitHubService } from './github.service';

import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recruiter', component: RecruiterComponent }
]
const appRoutingProviders: any[] = [];
const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    RecruiterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
      GitHubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
