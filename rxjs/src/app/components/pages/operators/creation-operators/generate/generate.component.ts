import { Component, OnInit } from '@angular/core';
import { asapScheduler, generate } from 'rxjs';
import { GenerateOptions } from 'rxjs/internal/observable/generate';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
  ngOnInit(): void {
    //it is like for loop, generate take object of generateComponent
    let generateComponent: GenerateOptions<number, number> = {
      initialState: 0,
      condition: x => x < 5,
      iterate: x => x + 1,
      resultSelector: x => x * 5, //can change the result
      // scheduler: asapScheduler //can add scheduler also.
    }
    
    let source$ = generate(generateComponent);

    source$ .subscribe({
      next: value => console.log(value),
      complete: () => console.log('Complete!')
    });
     
    // Logs:
    // 0
    // 1
    // 2
    // 'Complete!'
  }
}
