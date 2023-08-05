import { Component, OnInit } from '@angular/core';
import { of, partition } from 'rxjs';

@Component({
  selector: 'app-partition',
  templateUrl: './partition.component.html',
  styleUrls: ['./partition.component.css']
})
export class PartitionComponent implements OnInit{
  ngOnInit(): void {

      //It's like filter, but returns two Observables: one like the output of filter, and the other with values that did not pass the condition.
      const observableValues = of(1, 2, 3, 4, 5, 6);
      const [evens$, odds$] = partition(observableValues, value => value % 2 === 0);
      
      odds$.subscribe(x => console.log('odds', x));
      evens$.subscribe(x => console.log('evens', x));
      
      // Logs:
      // odds 1
      // odds 3
      // odds 5
      // evens 2
      // evens 4
      // evens 6

  }
}
