import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.css']
})
export class ReplaySubjectComponent implements OnInit {
  ngOnInit(): void {
      let replaysubject$ = new ReplaySubject(2);

      replaysubject$.next(1);

      replaysubject$.subscribe(data => {
        console.log('observer 1', data);
      }, err => {
        console.log(err);
      });

      replaysubject$.next(2);
      replaysubject$.next(3);
      replaysubject$.next(4);

      //this is subscribing after data has been emitted, but it will aslo get all emitted data.
      //since 2 is passed in parameter, it will givr only 2 values.
      setTimeout(() => {
        replaysubject$.subscribe(data => {
          console.log('observer 2', data);
        }, err => {
          console.log(err);
        });
      }, 3000);
  }
}
