import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent implements OnInit{
  ngOnInit(): void {
                  //start,   end,   scheduler
    const numbers = range(1, 3);
    
    numbers.subscribe({
      next: value => console.log(value),
      complete: () => console.log('Complete!')
    });
    
    // Logs:
    // 1
    // 2
    // 3
    // 'Complete!'
  }
}
