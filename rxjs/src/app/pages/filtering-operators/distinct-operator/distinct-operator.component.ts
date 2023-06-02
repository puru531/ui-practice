import { Component, OnInit } from '@angular/core';
import { distinct, from, of } from 'rxjs';

@Component({
  selector: 'app-distinct-operator',
  templateUrl: './distinct-operator.component.html',
  styleUrls: ['./distinct-operator.component.css']
})
export class DistinctOperatorComponent implements OnInit {
  ngOnInit(): void {
      of(1,2,3,4,5,2,4,5,3,7,6,7,2,1,1).pipe(distinct()).subscribe(data => console.log(data));

      var employee = [
        {id: '1', name: 'Leela'},
        {id: '2', name: 'Leela Web Dev'},
        {id: '3', name: 'Leela'},
        {id: '1', name: 'Leelaa'},
      ]
      from(employee).pipe(distinct(x => x.name)).subscribe(data => console.log(data));
      from(employee).pipe(distinct(x => x.id)).subscribe(data => console.log(data));
  }

}
