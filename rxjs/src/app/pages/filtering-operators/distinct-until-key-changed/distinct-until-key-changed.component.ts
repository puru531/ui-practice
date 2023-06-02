import { Component, OnInit } from '@angular/core';
import { distinctUntilKeyChanged, from } from 'rxjs';

@Component({
  selector: 'app-distinct-until-key-changed',
  templateUrl: './distinct-until-key-changed.component.html',
  styleUrls: ['./distinct-until-key-changed.component.css']
})
export class DistinctUntilKeyChangedComponent implements OnInit{
  ngOnInit(): void {
    let employee = [
      {id: '1', name: 'Leela'},
      {id: '2', name: 'Leela2'},
      {id: '2', name: 'Le4ela2'},
      {id: '2', name: 'Leela2'},
      {id: '3', name: 'Leela3'},
      {id: '3', name: 'Leela3'},
      {id: '4', name: 'Leela4'},
      {id: '4', name: 'Leela4'},
      {id: '4', name: 'Leela4'},
    ];

    // from(employee).pipe(distinctUntilKeyChanged('name')).subscribe(data => console.log(data));

    from(employee).pipe(distinctUntilKeyChanged('name', (prev, cur) => {
      return prev.substr(0,4) === cur.substr(0,4) //check Leel
    })).subscribe(data => console.log(data));
  }
}
