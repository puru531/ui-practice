import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CancellingObservableComponent } from './components/Basics/cancelling-observable/cancelling-observable.component';
import { OperatorsComponent } from './components/pages/operators/operators.component';
import { BufferTimeOperatorComponent } from './components/pages/operators/transformation-operators/buffer-time-operator/buffer-time-operator.component';
import { BufferOperatorComponent } from './components/pages/operators/transformation-operators/buffer-operator/buffer-operator.component';
import { BufferCountOperatorComponent } from './components/pages/operators/transformation-operators/buffer-count-operator/buffer-count-operator.component';
import { BufferToggleOperatorComponent } from './components/pages/operators/transformation-operators/buffer-toggle-operator/buffer-toggle-operator.component';
import { TakeOperatorComponent } from './components/pages/operators/filtering-operators/take-operator/take-operator.component';
import { BufferWhenOperatorComponent } from './components/pages/operators/transformation-operators/buffer-when-operator/buffer-when-operator.component';
import { TakeLastOperatorComponent } from './components/pages/operators/filtering-operators/take-last-operator/take-last-operator.component';
import { TakeUntilComponent } from './components/pages/operators/filtering-operators/take-untill/take-untill.component';
import { TakeWhileComponent } from './components/pages/operators/filtering-operators/take-while/take-while.component';
import { SkipOperatorComponent } from './components/pages/operators/filtering-operators/skip-operator/skip-operator.component';
import { SkipLastOperatorComponent } from './components/pages/operators/filtering-operators/skip-last-operator/skip-last-operator.component';
import { SkipUntilOperatorComponent } from './components/pages/operators/filtering-operators/skip-until-operator/skip-until-operator.component';
import { SkipWhileOperatorComponent } from './components/pages/operators/filtering-operators/skip-while-operator/skip-while-operator.component';
import { DistinctOperatorComponent } from './components/pages/operators/filtering-operators/distinct-operator/distinct-operator.component';
import { DistinctUntilChangedOperatorComponent } from './components/pages/operators/filtering-operators/distinct-until-changed-operator/distinct-until-changed-operator.component';
import { DistinctUntilKeyChangedComponent } from './components/pages/operators/filtering-operators/distinct-until-key-changed/distinct-until-key-changed.component';
import { FilterOperatorComponent } from './components/pages/operators/filtering-operators/filter-operator/filter-operator.component';
import { SampleOperatorComponent } from './components/pages/operators/filtering-operators/sample-operator/sample-operator.component';
import { AuditOperatorComponent } from './components/pages/operators/filtering-operators/audit-operator/audit-operator.component';
import { ThrottleOperatorComponent } from './components/pages/operators/filtering-operators/throttle-operator/throttle-operator.component';
import { FirstOperatorComponent } from './components/pages/operators/filtering-operators/first-operator/first-operator.component';
import { LastOperatorComponent } from './components/pages/operators/filtering-operators/last-operator/last-operator.component';
import { DebounceOperatorComponent } from './components/pages/operators/filtering-operators/debounce-operator/debounce-operator.component';
import { ElementAtOperatorComponent } from './components/pages/operators/filtering-operators/element-at-operator/element-at-operator.component';
import { IgnoreElementsOperatorComponent } from './components/pages/operators/filtering-operators/ignore-elements-operator/ignore-elements-operator.component';
import { SingleOperatorComponent } from './components/pages/operators/filtering-operators/single-operator/single-operator.component';
import { MapOperatorComponent } from './components/pages/operators/transformation-operators/map-operator/map-operator.component';
import { MapToOperatorComponent } from './components/pages/operators/transformation-operators/map-to-operator/map-to-operator.component';
import { AjaxComponent } from './components/pages/operators/creation-operators/ajax/ajax.component';
import { MergeMapComponent } from './components/pages/operators/higher-order-operators/merge-map/merge-map.component';
import { ConcatMapComponent } from './components/pages/operators/higher-order-operators/concat-map/concat-map.component';
import { ExhaustMapComponent } from './components/pages/operators/higher-order-operators/exhaust-map/exhaust-map.component';
import { SwitchMapComponent } from './components/pages/operators/higher-order-operators/switch-map/switch-map.component';
import { SubjectsComponent } from './components/pages/subjects/subjects.component';
import { AboutSubjectsComponent } from './components/pages/subjects/about-subjects/about-subjects.component';
import { NewObservableComponent } from './components/Basics/new-observable/new-observable.component';
import { FunctionsObservableComponent } from './components/Basics/functions-observable/functions-observable.component';
import { OperatorBasicsComponent } from './components/Basics/operator-basics/operator-basics.component';
import { ColdHotObservablesComponent } from './components/pages/subjects/cold-hot-observables/cold-hot-observables.component';
import { ConnectableObservablesComponent } from './components/pages/subjects/connectable-observables/connectable-observables.component';
import { ShareOperatorComponent } from './components/pages/subjects/share-operator/share-operator.component';
import { BehaviorSubjectComponent } from './components/pages/subjects/behavior-subject/behavior-subject.component';
import { ReplaySubjectComponent } from './components/pages/subjects/replay-subject/replay-subject.component';
import { AsyncSubjectComponent } from './components/pages/subjects/async-subject/async-subject.component';
import { VoidSubjectComponent } from './components/pages/subjects/void-subject/void-subject.component';
import { CatchErrorComponent } from './components/pages/operators/error-handling-operators/catch-error/catch-error.component';
import { RetryOperatorComponent } from './components/pages/operators/error-handling-operators/retry-operator/retry-operator.component';
import { CombineLatestComponent } from './components/pages/operators/join-creation-operators/combine-latest/combine-latest.component';
import { ConcatComponent } from './components/pages/operators/join-creation-operators/concat/concat.component';
import { ForkJoinComponent } from './components/pages/operators/join-creation-operators/fork-join/fork-join.component';
import { MergeComponent } from './components/pages/operators/join-creation-operators/merge/merge.component';
import { PartitionComponent } from './components/pages/operators/join-creation-operators/partition/partition.component';
import { RaceComponent } from './components/pages/operators/join-creation-operators/race/race.component';
import { ZipComponent } from './components/pages/operators/join-creation-operators/zip/zip.component';
import { SchedulersComponent } from './components/pages/operators/schedulers/schedulers.component';
import { DeferOperatorComponent } from './components/pages/operators/creation-operators/defer-operator/defer-operator.component';
import { RangeComponent } from './components/pages/operators/creation-operators/range/range.component';
import { GenerateComponent } from './components/pages/operators/creation-operators/generate/generate.component';
import { TimerComponent } from './components/pages/operators/creation-operators/timer/timer.component';
import { CountComponent } from './components/pages/operators/mathematical-and-aggregate-operators/count/count.component';
import { MaxComponent } from './components/pages/operators/mathematical-and-aggregate-operators/max/max.component';
import { MinComponent } from './components/pages/operators/mathematical-and-aggregate-operators/min/min.component';
import { ReduceComponent } from './components/pages/operators/mathematical-and-aggregate-operators/reduce/reduce.component';

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
    LastOperatorComponent,
    DebounceOperatorComponent,
    ElementAtOperatorComponent,
    IgnoreElementsOperatorComponent,
    SingleOperatorComponent,
    MapOperatorComponent,
    MapToOperatorComponent,
    AjaxComponent,
    MergeMapComponent,
    ConcatMapComponent,
    ExhaustMapComponent,
    SwitchMapComponent,
    SubjectsComponent,
    AboutSubjectsComponent,
    ColdHotObservablesComponent,
    ConnectableObservablesComponent,
    ShareOperatorComponent,
    BehaviorSubjectComponent,
    ReplaySubjectComponent,
    AsyncSubjectComponent,
    VoidSubjectComponent,
    CatchErrorComponent,
    RetryOperatorComponent,
    CombineLatestComponent,
    ConcatComponent,
    ForkJoinComponent,
    MergeComponent,
    PartitionComponent,
    RaceComponent,
    ZipComponent,
    SchedulersComponent,
    DeferOperatorComponent,
    RangeComponent,
    GenerateComponent,
    TimerComponent,
    CountComponent,
    MaxComponent,
    MinComponent,
    ReduceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
