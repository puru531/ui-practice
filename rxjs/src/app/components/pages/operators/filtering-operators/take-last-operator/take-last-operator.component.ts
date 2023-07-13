import { Component, OnInit } from '@angular/core';
import { interval, take, takeLast } from 'rxjs';

@Component({
  selector: 'app-take-last-operator',
  templateUrl: './take-last-operator.component.html',
  styleUrls: ['./take-last-operator.component.css']
})
export class TakeLastOperatorComponent implements OnInit {
  ngOnInit(): void {
      interval(500).pipe(take(10) ,takeLast(3)).subscribe(data => console.log(data)); //take will stop the interval after taking 10 values, now 10 will be taken by takeLast and will emit 3 values.
  }
}
