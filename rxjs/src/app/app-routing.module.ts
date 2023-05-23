import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsComponent } from './pages/operators/operators.component';
import { BufferTimeOperatorComponent } from './pages/transformation-operators/buffer-time-operator/buffer-time-operator.component';
import { BufferOperatorComponent } from './pages/transformation-operators/buffer-operator/buffer-operator.component';
import { BufferCountOperatorComponent } from './pages/transformation-operators/buffer-count-operator/buffer-count-operator.component';

const routes: Routes = [
  {
    path: 'operators',
    component: OperatorsComponent,
    children: [
      { path: 'buffer', component: BufferOperatorComponent },
      { path: 'bufferCount', component: BufferCountOperatorComponent },
      { path: 'bufferTime', component: BufferTimeOperatorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
