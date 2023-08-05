import { Component, OnInit } from '@angular/core';
import { of, zip, map } from 'rxjs';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css']
})
export class ZipComponent implements OnInit{
  ngOnInit(): void {
      //Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each of its input Observables.
      //If the last parameter is a function, this function is used to compute the created value from the input values. Otherwise, an array of the input values is returned.
      const age$ = of(27, 25, 29);
      const name$ = of('Foo', 'Bar', 'Beer');
      const isDev$ = of(true, true, false);

      zip(age$, name$, isDev$).pipe(
        map(([age, name, isDev]) => ({ age, name, isDev }))
      )
      .subscribe(x => console.log(x));

      // Outputs
      // { age: 27, name: 'Foo', isDev: true }
      // { age: 25, name: 'Bar', isDev: true }
      // { age: 29, name: 'Beer', isDev: false }
  }
}
