import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsComponent } from './pages/operators/operators.component';
import { BufferTimeOperatorComponent } from './pages/transformation-operators/buffer-time-operator/buffer-time-operator.component';
import { BufferOperatorComponent } from './pages/transformation-operators/buffer-operator/buffer-operator.component';
import { BufferCountOperatorComponent } from './pages/transformation-operators/buffer-count-operator/buffer-count-operator.component';
import { BufferToggleOperatorComponent } from './pages/transformation-operators/buffer-toggle-operator/buffer-toggle-operator.component';
import { BufferWhenOperatorComponent } from './pages/transformation-operators/buffer-when-operator/buffer-when-operator.component';
import { TakeOperatorComponent } from './pages/filtering-operators/take-operator/take-operator.component';
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
import { DebounceOperatorComponent } from './pages/filtering-operators/debounce-operator/debounce-operator.component';
import { ElementAtOperatorComponent } from './pages/filtering-operators/element-at-operator/element-at-operator.component';
import { IgnoreElementsOperatorComponent } from './pages/filtering-operators/ignore-elements-operator/ignore-elements-operator.component';
import { SingleOperatorComponent } from './pages/filtering-operators/single-operator/single-operator.component';
import { MapOperatorComponent } from './pages/transformation-operators/map-operator/map-operator.component';
import { MapToOperatorComponent } from './pages/transformation-operators/map-to-operator/map-to-operator.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
