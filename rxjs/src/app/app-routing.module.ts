import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsComponent } from './components/pages/operators/operators.component';
import { BufferTimeOperatorComponent } from './components/pages/operators/transformation-operators/buffer-time-operator/buffer-time-operator.component';
import { BufferOperatorComponent } from './components/pages/operators/transformation-operators/buffer-operator/buffer-operator.component';
import { BufferCountOperatorComponent } from './components/pages/operators/transformation-operators/buffer-count-operator/buffer-count-operator.component';
import { BufferToggleOperatorComponent } from './components/pages/operators/transformation-operators/buffer-toggle-operator/buffer-toggle-operator.component';
import { BufferWhenOperatorComponent } from './components/pages/operators/transformation-operators/buffer-when-operator/buffer-when-operator.component';
import { TakeOperatorComponent } from './components/pages/operators/filtering-operators/take-operator/take-operator.component';
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

const routes: Routes = [
  {
    path: 'operators',
    component: OperatorsComponent,
    children: [
      { path: 'buffer', component: BufferOperatorComponent },
      { path: 'bufferCount', component: BufferCountOperatorComponent },
      { path: 'bufferTime', component: BufferTimeOperatorComponent },
      { path: 'bufferToggle', component: BufferToggleOperatorComponent },
      { path: 'bufferWhen', component: BufferWhenOperatorComponent },
      { path: 'take', component: TakeOperatorComponent },
      { path: 'takeLast', component: TakeLastOperatorComponent },
      { path: 'takeUntil', component: TakeUntilComponent },
      { path: 'takeWhile', component: TakeWhileComponent },
      { path: 'skip', component: SkipOperatorComponent },
      { path: 'skipLast', component: SkipLastOperatorComponent },
      { path: 'skipUntil', component: SkipUntilOperatorComponent },
      { path: 'skipWhile', component: SkipWhileOperatorComponent },
      { path: 'distinct', component: DistinctOperatorComponent },
      { path: 'distinctntilChanged', component: DistinctUntilChangedOperatorComponent },
      { path: 'distinctUntilKeyChanged', component: DistinctUntilKeyChangedComponent },
      { path: 'filter', component: FilterOperatorComponent},
      { path: 'sample', component: SampleOperatorComponent},
      { path: 'audit', component: AuditOperatorComponent},
      { path: 'throttle', component: ThrottleOperatorComponent},
      { path: 'first', component: FirstOperatorComponent},
      { path: 'last', component: LastOperatorComponent},
      { path: 'debounce', component: DebounceOperatorComponent},
      { path: 'elementat', component: ElementAtOperatorComponent},
      { path: 'ignoreElements', component: IgnoreElementsOperatorComponent},
      { path: 'single', component: SingleOperatorComponent},
      { path: 'map', component: MapOperatorComponent},
      { path: 'mapto', component: MapToOperatorComponent},
      { path: 'ajax', component: AjaxComponent},
      { path: 'mergemap', component: MergeMapComponent},
      { path: 'concatmap', component: ConcatMapComponent},
      { path: 'exhaustmap', component: ExhaustMapComponent},
      { path: 'switchmap', component: SwitchMapComponent},
      { path: 'catcherror', component: CatchErrorComponent},
      { path: 'retry', component: RetryOperatorComponent},
      { path: 'combineLatest', component: CombineLatestComponent},
      { path: 'concat', component: ConcatComponent},
      { path: 'forkjoin', component: ForkJoinComponent},
      { path: 'merge', component: MergeComponent},
      { path: 'partition', component: PartitionComponent},
      { path: 'race', component: RaceComponent},
      { path: 'zip', component: ZipComponent},
      { path: 'scheduler', component: SchedulersComponent},
      { path: 'defer', component: DeferOperatorComponent},
      { path: 'range', component: RangeComponent},
      { path: 'generate', component: GenerateComponent},
      { path: 'timer', component: TimerComponent},
      { path: 'count', component: CountComponent},
      { path: 'max', component: MaxComponent},
      { path: 'min', component: MinComponent},
      { path: 'reduce', component: ReduceComponent},
    ],
  },
  {
    path: 'subjects',
    component: SubjectsComponent,
    children: [
      { path: 'aboutsubject', component: AboutSubjectsComponent},
      { path: 'coldhot', component: ColdHotObservablesComponent},
      { path: 'connectable', component: ConnectableObservablesComponent},
      { path: 'share', component: ShareOperatorComponent},
      { path: 'behaviorsubject', component: BehaviorSubjectComponent},
      { path: 'replaysubject', component: ReplaySubjectComponent},
      { path: 'asyncsubject', component: AsyncSubjectComponent},
      { path: 'voidsubject', component: VoidSubjectComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
