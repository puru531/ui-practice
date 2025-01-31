import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BasicsComponent } from './components/basics/basics.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { ServicesComponent } from './components/services/services.component';

@NgModule({
  declarations: [AppComponent, BasicsComponent, PipesComponent, ReversePipe, ServicesComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
