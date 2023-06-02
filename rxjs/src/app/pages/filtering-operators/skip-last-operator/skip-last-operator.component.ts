import { Component, OnInit } from '@angular/core';
import { interval, of, skipLast } from 'rxjs';

@Component({
  selector: 'app-skip-last-operator',
  templateUrl: './skip-last-operator.component.html',
  styleUrls: ['./skip-last-operator.component.css']
})
export class SkipLastOperatorComponent implements OnInit {
  ngOnInit(): void {
      of(1,2,3,4,5,6,7,8,9,10,11).pipe(skipLast(3)).subscribe(data => console.log(data)); //skip 3 items from last

      interval(500).pipe(skipLast(10)).subscribe(data => console.log(data)); // It should not give output, but since it is infinite, it will wait for 10 operators and start rmitting th values
      //It will wait for 10 values then it will understand that it has more than 0 values and start emittng th data. As sson as observable copletes, it also gets completes but 10 values before.
  }
}
