import { Component, OnInit } from '@angular/core';
import { interval, sample } from 'rxjs';

@Component({
  selector: 'app-sample-operator',
  templateUrl: './sample-operator.component.html',
  styleUrls: ['./sample-operator.component.css']
})
export class SampleOperatorComponent implements OnInit {
  ngOnInit(): void {
      interval(500).pipe(sample(interval(2000))).subscribe(data => console.log(data));
  }
}
