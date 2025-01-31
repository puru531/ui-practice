import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss'],
})
export class PipesComponent {
  today = new Date();
  name = 'Purushottam';
  price = 10.6556;
  pi = 3.14159265359;

  promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise Resolved!'), 3000);
  });

  object = {
    name: 'Purushottam',
    age: 25,
    city: 'Bangalore',
  };

  fruits = ['Apple', 'Banana', 'Cherry', 'Dates', 'Elderberry'];

  title = 'angular pipes';

  count = 2;
}
