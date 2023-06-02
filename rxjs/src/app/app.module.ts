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
import { BufferToggleOperatorComponent } from './pages/transformation-operators/buffer-toggle-operator/buffer-toggle-operator.component';
import { TakeOperatorComponent } from './pages/filtering-operators/take-operator/take-operator.component';
import { BufferWhenOperatorComponent } from './pages/transformation-operators/buffer-when-operator/buffer-when-operator.component';
import { TakeLastOperatorComponent } from './pages/filtering-operators/take-last-operator/take-last-operator.component';
import { TakeUntilComponent } from './pages/filtering-operators/take-untill/take-untill.component';
import { TakeWhileComponent } from './pages/filtering-operators/take-while/take-while.component';
import { SkipOperatorComponent } from './pages/filtering-operators/skip-operator/skip-operator.component';
import { SkipLastOperatorComponent } from './pages/filtering-operators/skip-last-operator/skip-last-operator.component';
import { SkipUntilOperatorComponent } from './pages/filtering-operators/skip-until-operator/skip-until-operator.component';
import { SkipWhileOperatorComponent } from './pages/filtering-operators/skip-while-operator/skip-while-operator.component';
import { DistinctOperatorComponent } from './pages/filtering-operators/distinct-operator/distinct-operator.component';
import { DistinctUntilChangedOperatorComponent } from './pages/filtering-operators/distinct-until-changed-operator/distinct-until-changed-operator.component';
import { DistinctUntilKeyChangedComponent } from './pages/filtering-operators/distinct-until-key-changed/distinct-until-key-changed.component';
import { FilterOperatorComponent } from './pages/filtering-operators/filter-operator/filter-operator.component';
import { SampleOperatorComponent } from './pages/filtering-operators/sample-operator/sample-operator.component';
import { AuditOperatorComponent } from './pages/filtering-operators/audit-operator/audit-operator.component';
import { ThrottleOperatorComponent } from './pages/filtering-operators/throttle-operator/throttle-operator.component';
import { FirstOperatorComponent } from './pages/filtering-operators/first-operator/first-operator.component';
import { LastOperatorComponent } from './pages/filtering-operators/last-operator/last-operator.component';

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
    BufferTimeOperatorComponent,
    BufferToggleOperatorComponent,
    BufferWhenOperatorComponent,
    TakeOperatorComponent,
    TakeLastOperatorComponent,
    TakeUntilComponent,
    TakeWhileComponent,
    SkipOperatorComponent,
    SkipLastOperatorComponent,
    SkipUntilOperatorComponent,
    SkipWhileOperatorComponent,
    DistinctOperatorComponent,
    DistinctUntilChangedOperatorComponent,
    DistinctUntilKeyChangedComponent,
    FilterOperatorComponent,
    SampleOperatorComponent,
    AuditOperatorComponent,
    ThrottleOperatorComponent,
    FirstOperatorComponent,
    LastOperatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
