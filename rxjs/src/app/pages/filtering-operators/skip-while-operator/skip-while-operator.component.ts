import { Component, OnInit } from '@angular/core';
import { of, skipWhile } from 'rxjs';

@Component({
  selector: 'app-skip-while-operator',
  templateUrl: './skip-while-operator.component.html',
  styleUrls: ['./skip-while-operator.component.css']
})
export class SkipWhileOperatorComponent implements OnInit {
  ngOnInit(): void {
      of(1,2,3,4,5,6).pipe(skipWhile(x => x < 4)).subscribe(data => console.log(data)); //4,5,6
      of(1,2,3,4,5,6,1,2,3).pipe(skipWhile(x => x < 4)).subscribe(data => console.log(data)); //4,5,6,1,2,3 Once skipWhile becomes false, again it will not check for condition.
  }
}
