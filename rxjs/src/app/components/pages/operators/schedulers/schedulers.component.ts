import { Component, OnInit } from '@angular/core';
import { asapScheduler, asyncScheduler, merge, of, queueScheduler } from 'rxjs';

@Component({
  selector: 'app-schedulers',
  templateUrl: './schedulers.component.html',
  styleUrls: ['./schedulers.component.css']
})
export class SchedulersComponent implements OnInit{
  ngOnInit(): void {
      //QueueSchedulers
      console.log('===== starting');
      let queueScheduler$ = of('Queue Scheduler', queueScheduler);
      let asyncScheduler$ = of('Async Scheduler', asyncScheduler); //async scheduler is kept in the task of JavaScript
      let asapScheduler$ = of('Asap Scheduler', asapScheduler); //asap scheduler is kept in the micro-task of JavaScript
      //So after completing the normal queue, JS will start executing micro-task first then it will execute tesk.
      merge(queueScheduler$, asyncScheduler$, asapScheduler$).subscribe(data => console.log(data));
      console.log('===== ending');

      // o/p
      //starting
      //Queue Scheduler
      //ending
      //Asap Scheduler
      //Async Scheduler.
  }
}
