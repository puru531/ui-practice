import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-void-subject',
  templateUrl: './void-subject.component.html',
  styleUrls: ['./void-subject.component.css']
})
export class VoidSubjectComponent implements OnInit {
  ngOnInit(): void {
    const subject$ = new Subject<void>(); //using void will means it will not emit any value.
    setTimeout(() => subject$.next(), 1000); //no need to pass data in next.
    subject$.subscribe(data => {
      console.log(data); //undefined.
    }, err => {
      console.log(err);
    });
  }
}
