import { Component, OnInit } from '@angular/core';
import { filter, interval, map } from 'rxjs';

@Component({
  selector: 'app-operator-basics',
  templateUrl: './operator-basics.component.html',
  styleUrls: ['./operator-basics.component.css']
})
export class OperatorBasicsComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
      const newObservable = interval(1000); //creation operator

      // newObservable.subscribe((num) => {
      //   if(num % 2 === 0) {
      //     console.log(num);
      //   }
      // })
      
      //pipe operator
      newObservable.pipe(
        filter((number) => {
          return number % 2 === 0;
        }), 
        map((number) =>{
          return 'Even Number: ' + number
        })
      ).subscribe(num => {
        console.log(num);
      })

  }

}
