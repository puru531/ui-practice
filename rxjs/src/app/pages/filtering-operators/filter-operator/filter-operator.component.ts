import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter, fromEvent, of } from 'rxjs';

@Component({
  selector: 'app-filter-operator',
  templateUrl: './filter-operator.component.html',
  styleUrls: ['./filter-operator.component.css']
})
export class FilterOperatorComponent implements OnInit, OnDestroy {
  eventSubscription!: Subscription;
  ngOnInit(): void {
      of(1,2,3,4,5).pipe(filter(value => value > 3)).subscribe(data => console.log(data));
      this.eventSubscription = fromEvent(document, 'click').pipe(filter((event: Event) => (event.target as HTMLElement).tagName === 'P')).subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {
      this.eventSubscription.unsubscribe();
  }
}
