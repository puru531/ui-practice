import { Component, OnInit } from '@angular/core';
import { interval, skip, take } from 'rxjs';

@Component({
  selector: 'app-skip-operator',
  templateUrl: './skip-operator.component.html',
  styleUrls: ['./skip-operator.component.css']
})
export class SkipOperatorComponent implements OnInit{
  ngOnInit(): void {
      interval(500).pipe(take(20) ,skip(10)).subscribe(data => console.log(data), err => console.error(err)); //will skip first 10 values
  }
}
