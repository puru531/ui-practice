import { Component, OnInit } from '@angular/core';
import { bufferWhen, interval, tap } from 'rxjs';

@Component({
  selector: 'app-buffer-when-operator',
  templateUrl: './buffer-when-operator.component.html',
  styleUrls: ['./buffer-when-operator.component.css']
})
export class BufferWhenOperatorComponent implements OnInit {
  ngOnInit(): void {
      interval(500)
      .pipe(
        bufferWhen(() => {
          return interval(2000); //when this will emit the data, the main observable will emit the buffered value and start new buffering
      })
      ).subscribe(data => console.log(data));
  }
}
