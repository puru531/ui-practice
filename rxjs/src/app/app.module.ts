import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewObservableComponent } from './components/new-observable/new-observable.component';
import { FunctionsObservableComponent } from './components/functions-observable/functions-observable.component';
import { CancellingObservableComponent } from './components/cancelling-observable/cancelling-observable.component';
import { OperatorBasicsComponent } from './components/operator-basics/operator-basics.component';
import { OperatorsComponent } from './pages/operators/operators.component';
import { BufferTimeOperatorComponent } from './pages/transformation-operators/buffer-time-operator/buffer-time-operator.component';
import { BufferOperatorComponent } from './pages/transformation-operators/buffer-operator/buffer-operator.component';
import { BufferCountOperatorComponent } from './pages/transformation-operators/buffer-count-operator/buffer-count-operator.component';

@NgModule({
  declarations: [
    AppComponent,
    NewObservableComponent,
    FunctionsObservableComponent,
    CancellingObservableComponent,
    OperatorBasicsComponent,
    BufferOperatorComponent,
    OperatorsComponent,
    BufferCountOperatorComponent,
    BufferTimeOperatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
