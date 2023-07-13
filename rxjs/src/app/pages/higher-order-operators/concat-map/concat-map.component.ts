import { Component, OnInit } from '@angular/core';
import { concatMap, map, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.css']
})
export class ConcatMapComponent implements OnInit {
  //executes inner observable in sequencial order
  // it will wait for inner observable to complete, before starting the new one from source Observable
  ngOnInit(): void {
      of(1,2,3,4,5).pipe(concatMap(id => {
        return ajax(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(map(result => result.response))
      })).subscribe(data => {
        console.log(data); // this will be one by one and sequencial
      }, err => {
        console.log(err);
      });
  }
}
