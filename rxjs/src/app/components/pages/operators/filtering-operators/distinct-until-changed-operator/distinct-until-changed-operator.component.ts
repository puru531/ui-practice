import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, from, of } from 'rxjs';

@Component({
  selector: 'app-distinct-until-changed-operator',
  templateUrl: './distinct-until-changed-operator.component.html',
  styleUrls: ['./distinct-until-changed-operator.component.css']
})
export class DistinctUntilChangedOperatorComponent implements OnInit {
  ngOnInit(): void {
      of(1,2,2,1,3,3,4,1,1,5,5,5,6,7,7,7).pipe(distinctUntilChanged()).subscribe(data => console.log(data));
      //1,2,1,3,4,1,5,6,7

      of(1,2,3,4,5).pipe(distinctUntilChanged((prev, curr) => {
        return curr ===  prev + 1; //prev emitted 1 curr 2 ---> prev + 1 = 2 === curr 2 -->true : It will not be emitted
      })).subscribe(data => console.log(data));

      // let emp = {id: '1', name: 'Leela'};

      // var employee = [
      //   emp,
      //   emp, //same memory reference so, it wll be distincted
      //   {id: '3', name: 'Leela Web Dev'},
      //   {id: '1', name: 'Leelaa'},
      // ];

      var employee = [
        {id: '1', name: 'Leela'},
        {id: '2', name: 'Leela'},
        {id: '3', name: 'Leela Web Dev'},
        {id: '1', name: 'Leelaa'},
      ];

      from(employee).pipe(distinctUntilChanged((prev, cur) => {
        return prev.id === cur.id;
      })).subscribe(data => console.log(data));

      console.log('=======');

      from(employee).pipe(distinctUntilChanged((prev, cur) => {
        return prev.name === cur.name;
      })).subscribe(data => console.log(data));

      console.log('======= specify selecror separately');

      from(employee).pipe(distinctUntilChanged(
        (prev, cur) => {
        return prev === cur;
        },
        (selector) => selector.name
      ),
      ).subscribe(data => console.log(data));

  }
}
