import { Component, OnInit } from '@angular/core';
import { concat, of } from 'rxjs';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css']
})
export class ConcatComponent implements OnInit {
  ngOnInit(): void {
      //subscribes to the observables in sequencial order.
      let source1$ = of(1, 2, 3);

      let source2$ = of('a', 'b', 'c', 'd', 'e', 'f');
      //will wait for 1st observable to complete, then only it will go for next.
      concat(source1$, source2$).subscribe((data) => {
        console.log(data); //will emit after 5 seconds.
      });
  }
}
