import { Component, OnInit } from '@angular/core';
import { interval, mapTo } from 'rxjs';

@Component({
  selector: 'app-map-to-operator',
  templateUrl: './map-to-operator.component.html',
  styleUrls: ['./map-to-operator.component.css']
})
export class MapToOperatorComponent implements OnInit {
  //Emits the given constant value on the output Observable every time the source Observable emits a value.
  ngOnInit(): void {
    //Ignores the source value and emits the given constant value on the output Observable
    interval(500).pipe(mapTo('HeyPuru')).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    }, () => {
      console.log('completed');
    });
      
  }
}
