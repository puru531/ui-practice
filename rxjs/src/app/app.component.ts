import { AfterViewInit, Component } from '@angular/core';
import { from, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'rxjs';

  postsArray = [
    {title: 'Puru1', description: 'Puru1 descripption'},
    {title: 'Puru2', description: 'Puru2 descripption'},
    {title: 'Puru3', description: 'Puru3 descripption'}
  ];

  postArrayObservable$ = from(this.postsArray); //from: converts everything into a observable

  promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved the promise");
    }, 3000);
  });
  promiseArrayObservable$ = from(this.promise);


  constructor() {
    // this.postArrayObservable$.subscribe({ //When an observable is subscribed, it has three methods
    //   next: (data) => console.log(data),  //if successful
    //   error: (err) => console.log(err),  //if failed
    //   complete: () => console.log("Completed") //after completion
    // })
    // this.promiseArrayObservable$.subscribe({
    //   next: (data) => console.log(data),
    //   error: (err) => console.log(err),  
    //   complete: () => console.log("Promise Completed") 
    // })
  }

  ngAfterViewInit(): void {
    // fromEvent(document.getElementById('fisrt-btn')!, 'click').subscribe({ //fromEvent: converts an event into an observable
    //   next: (data) => console.log(data),
    //   error: (err) => console.log(err),  
    //   complete: () => console.log("Promise Completed") //will not be executed because it never completes and always keeps listening
    // }) 
  }

}
