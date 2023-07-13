import { Component, OnInit } from '@angular/core';
import { exhaustMap, filter, interval, map, of, take, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-exhaust-map',
  templateUrl: './exhaust-map.component.html',
  styleUrls: ['./exhaust-map.component.css']
})
export class ExhaustMapComponent implements OnInit {
  //unlike concatMap it does not take keep source observable into buffer,
  // if anyvalue is emitted from source observable, in between while inner is executing, it will ignore that.
  ngOnInit(): void {
      of(1,2,3,4,5,6,7,8,9,10,11).pipe(exhaustMap(id => {
        return ajax(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(map(result => result.response))
      })).subscribe(data => {
        console.log(data); //only one printed, because all other id wee emiited during the inner observable was working with 1st id, s they were ignored.
      }, err => {
        console.log(err);
      });



      interval(100).pipe(
        filter(id => id > 0),
        tap(id => console.log(id)),
        exhaustMap(id => {
          return ajax(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(map(result => result.response))
        }),
        take(5)
        ).subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
}
