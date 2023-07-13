import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, buffer, fromEvent, interval, tap } from 'rxjs';

@Component({
  selector: 'app-buffer-operator',
  templateUrl: './buffer-operator.component.html',
  styleUrls: ['./buffer-operator.component.css']
})
export class BufferOperatorComponent implements OnInit, AfterViewInit {
  //Transformation Operators : buffer --> Collects values from the past as an array, and emits that array only when another Observable emits.
  intervalData: number[] = [];
  showDataObservable$!: Observable<Event>;
  constructor() {}
  ngOnInit(): void {
      
  }
  ngAfterViewInit(): void {
      this.showDataObservable$ = fromEvent(document.getElementById('showButton')!, 'click');
  }
  startInterval() {
    //buffer operator 
    interval(1000).pipe(tap(data => console.log(data)),buffer(this.showDataObservable$)).subscribe((data: number[]) => { //until and unless showDataObservable$ event is fired, it will buffer the inetrval data 
      this.intervalData.push(...data);
    })
  }

}
