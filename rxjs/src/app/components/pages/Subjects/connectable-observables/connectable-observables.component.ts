import { Component, OnInit } from '@angular/core';
import { connectable, interval, take } from 'rxjs';

@Component({
  selector: 'app-connectable-observables',
  templateUrl: './connectable-observables.component.html',
  styleUrls: ['./connectable-observables.component.css']
})
export class ConnectableObservablesComponent implements OnInit {
  ngOnInit(): void {
    //Instead of subject we can also use connectable to make a cold observable to hot observable.
      let source = connectable(interval(1000));

      source.pipe(take(10)).subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });

      setTimeout(() => {
        source.pipe(take(10)).subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err);
        });
      }, 3000);

      //until and unless we use connect method the observable will not be subscribed.
      source.connect();
  }
}
