import { Component, OnInit } from '@angular/core';
import { bufferCount, interval, of } from 'rxjs';

@Component({
  selector: 'app-buffer-count-operator',
  templateUrl: './buffer-count-operator.component.html',
  styleUrls: ['./buffer-count-operator.component.css']
})
export class BufferCountOperatorComponent implements OnInit {

  ngOnInit(): void {
    //bufferCount :- Buffers the source Observable values until the size hits the maximum bufferSize given.
        //parameter : bufferSize - The maximum size of the buffer emitted.
                    //startBufferEvery -- Optional. Default is null. Interval at which to start a new buffer. For example if startBufferEvery is 2, then a new buffer will be started on every other value from the source. A new buffer is started at the beginning of the source by default.
    // It will store in buffer and then emit the data in form of array having two elements of data.
    of(1,2,3,4).pipe(bufferCount(2)).subscribe(data => console.log(data));
    // interval(1000).pipe(bufferCount(3)).subscribe(data => console.log(data)); 
    interval(1000).pipe(bufferCount(4, 2)).subscribe(data => console.log(data)); // will also take two elements from last array.
  }

}
