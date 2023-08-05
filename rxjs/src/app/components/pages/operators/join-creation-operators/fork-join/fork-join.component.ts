import { Component, OnInit } from '@angular/core';
import { forkJoin, of, timer } from 'rxjs';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css']
})
export class ForkJoinComponent implements OnInit {
  //Wait for Observables to complete and then combine last values they emitted; complete immediately if an empty array is passed.
  ngOnInit(): void {
    const observable = forkJoin([
      of(1, 2, 3, 4),
      Promise.resolve(8),
      timer(4000)
    ]);
    
    observable.subscribe({
     next: value => console.log(value),
     complete: () => console.log('This is how it ends!'),
    });
  }

}
