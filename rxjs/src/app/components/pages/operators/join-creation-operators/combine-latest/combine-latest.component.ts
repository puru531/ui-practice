import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css']
})
export class CombineLatestComponent implements OnInit {
  ngOnInit(): void {
      //Everytime when a new value is emitted from any observable, 
      //It takes the latest emitted value from all observable and emits the value.
      //CombineLatest emits only when all observable emits the data.
      //If nay observable errors, combineLatest will also throw error.
      let source1$ = new Observable((obs) => {
        setTimeout(() => {
          obs.next(1);
        }, 2000);
      });

      let source2$ = new Observable((obs) => {
        setTimeout(() => {
          obs.next(10);
        }, 5000);
      });

      combineLatest([source1$, source2$]).subscribe((data) => {
        console.log(data); //will emit after 5 seconds.
      });
      
  }
}
