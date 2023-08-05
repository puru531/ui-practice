import { Component, OnInit } from '@angular/core';
import { interval, map, race } from 'rxjs';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit{
  ngOnInit(): void {
      //whichever observale will complete first, will be emitted.
      const obs1 = interval(7000).pipe(map(() => 'slow one'));
      const obs2 = interval(3000).pipe(map(() => 'fast one'));
      const obs3 = interval(5000).pipe(map(() => 'medium one'));

      race(obs1, obs2, obs3)
        .subscribe(winner => console.log(winner));

      // Outputs
      // a series of 'fast one'
    }
}
