import { Component, OnInit } from '@angular/core';
import { first, of } from 'rxjs';

@Component({
  selector: 'app-first-operator',
  templateUrl: './first-operator.component.html',
  styleUrls: ['./first-operator.component.css'],
})
export class FirstOperatorComponent implements OnInit {
  ngOnInit(): void {
    // of(1, 2, 3, 4, 5, 6, 7, 8, 9)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => console.log(data),
    //     (err) => console.error(err)
    //   );   // 1
    of(1, 2, 3, 4, 5, 6, 7, 8, 9)
      .pipe(first())
      .subscribe(
        (data) => console.log(data),
        (err) => console.error(err)
      );

    of(1, 2, 3, 4, 5, 6, 7, 8, 9)
      .pipe(first(val => val%2 ===0, 10)) //10 is default if none found it will throw an error, If default value is given then it will emit that
      .subscribe(
        (data) => console.log(data),
        (err) => console.error(err)
      );
    
  }
}
