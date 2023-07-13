import { Component, OnInit } from '@angular/core';
import { elementAt, of } from 'rxjs';

@Component({
  selector: 'app-element-at-operator',
  templateUrl: './element-at-operator.component.html',
  styleUrls: ['./element-at-operator.component.css']
})
export class ElementAtOperatorComponent implements OnInit {
  ngOnInit(): void {
      of(1,2,3,4,5).pipe(elementAt(2)).subscribe(data => console.log(data)); // 3
      //2nd parameter = default value
      of(1,2,3,4,5).pipe(elementAt(8, 16)).subscribe(data => console.log(data)); //16
      of(1,2,3,4,5).pipe(elementAt(8)).subscribe(data => console.log(data)); //ArgumentOutOfRange Error
  }
}
