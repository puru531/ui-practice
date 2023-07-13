import { Component, OnInit } from '@angular/core';
import { bufferToggle, interval, take, tap } from 'rxjs';

@Component({
  selector: 'app-buffer-toggle-operator',
  templateUrl: './buffer-toggle-operator.component.html',
  styleUrls: ['./buffer-toggle-operator.component.css'],
})
export class BufferToggleOperatorComponent implements OnInit {
  ngOnInit(): void {
    let opening = interval(6000).pipe(tap(() => console.log('open'))); // when it will emit the data, bufferToggle will start buffering
    let closing = () => interval(3000).pipe(tap(() => console.log('close'))); // When this will emit the data, bufferToggle will stop buffering, It should be a function returning observable
    interval(1000)
      .pipe(
        tap(data => console.log(data)),
        bufferToggle(opening, closing),
        take(3)
      ).subscribe(data => console.log(data));
  }
}
