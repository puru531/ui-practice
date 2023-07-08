import { AfterViewInit, Component, OnInit } from '@angular/core';
import { filter, fromEvent, map, of } from 'rxjs';

@Component({
  selector: 'app-map-operator',
  templateUrl: './map-operator.component.html',
  styleUrls: ['./map-operator.component.css']
})
export class MapOperatorComponent implements OnInit, AfterViewInit {
  //Similar to the well known Array.prototype.map function, 
  //this operator applies a projection to each value and emits that projection in the output Observable.
  ngOnInit(): void {
      of(1,2,3, 4, 5, 6).pipe(filter(val => val % 2 === 0), map((val) => val * 10)).subscribe(data => {
        console.log(data); //filter only even number --> send to map --> multiply all items with 10
      }, err => {
        console.log(err);
      }, () => {
        console.log('completed');
      });
  }
  ngAfterViewInit(): void {
      const mapBUtton = fromEvent(document.getElementById('map_button')!, 'click');
      mapBUtton.pipe(map((event: Event) => {
        return {
          x: (event as PointerEvent).clientX,  // moint point event is pointer Event
          y: (event as PointerEvent).clientY
        }
      })).subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      }, () => {
        console.log('completed');
      });
  }
}
