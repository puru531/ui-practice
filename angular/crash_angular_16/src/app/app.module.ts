import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BasicsComponent } from './components/basics/basics.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { ServicesComponent } from './components/services/services.component';
import { HttpApiComponent } from './components/http-api/http-api.component';
import { ObservablesComponent } from './components/observables/observables.component';
import { FormsComponent } from './components/forms/forms.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicsComponent,
    PipesComponent,
    ReversePipe,
    ServicesComponent,
    HttpApiComponent,
    ObservablesComponent,
    FormsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule], // Add HttpClientModule to imports array to use HttpClient service in the application to make HTTP requests
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
