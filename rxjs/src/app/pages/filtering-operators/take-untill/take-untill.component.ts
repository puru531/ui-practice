import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, fromEvent, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-take-untill',
  templateUrl: './take-untill.component.html',
  styleUrls: ['./take-untill.component.css']
})
export class TakeUntilComponent implements OnInit, AfterViewInit {

  buttonEvent!: Observable<Event>;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
      this.buttonEvent = fromEvent(document.getElementById('takeUntil')!, 'click');
  }

  startTimer() {
    interval(200).pipe(takeUntil(this.buttonEvent))
    .subscribe(data => console.log(data),(err) => console.log(err), () => console.log('Completed'))
    
  }
}
