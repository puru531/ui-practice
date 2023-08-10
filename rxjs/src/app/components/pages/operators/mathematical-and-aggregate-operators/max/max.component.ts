import { Component, OnInit } from '@angular/core';
import { of, max } from 'rxjs';

@Component({
  selector: 'app-max',
  templateUrl: './max.component.html',
  styleUrls: ['./max.component.css']
})
export class MaxComponent implements OnInit{

  ngOnInit(): void {
    of(5, 4, 7, 2, 8)
      .pipe(max())
      .subscribe(x => console.log(x));

    // Outputs
    // 8



      of(
        { age: 7, name: 'Foo' },
        { age: 5, name: 'Bar' },
        { age: 9, name: 'Beer' }
      ).pipe(
        max((a, b) => {
          console.log('====', a, b);
         return a.age < b.age ? -1 : 1; // - 1 = exclude, 1 = take into consideration
        })
      )
      .subscribe(x => console.log(x.name));

      // Outputs
      // 'Beer'
        }
}
