import { Component, OnInit } from '@angular/core';
import { filter, interval, of, switchMap, take } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.css']
})
export class SwitchMapComponent implements OnInit {
  //while inner observable is emiiting the values, in between if new value is emitted by source observable,
  // then it will leave emiiting that and start emitting with new emiited value from source observable
  ngOnInit(): void {
      of(1,2,3,4,5).pipe(
        switchMap(id => ajax(`https://jsonplaceholder.typicode.com/posts/${id}`))
      ).subscribe(data => {
        console.log(data.response); //only one response with id of 5.
      }, err => {
        console.log(err);
      });


      interval(200).pipe(
        filter(value => value > 0),
        switchMap(id => ajax(`https://jsonplaceholder.typicode.com/posts/${id}`)),
        take(5)
      ).subscribe(data => {
        console.log(data.response); //only one response with id of 5.
      }, err => {
        console.log(err);
      });
  }
}
