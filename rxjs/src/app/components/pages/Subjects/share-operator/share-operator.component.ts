import { Component, OnInit } from '@angular/core';
import { Connectable, interval, publish, refCount, share, take } from 'rxjs';

@Component({
  selector: 'app-share-operator',
  templateUrl: './share-operator.component.html',
  styleUrls: ['./share-operator.component.css']
})
export class ShareOperatorComponent implements OnInit {
  ngOnInit(): void {
    //publish and refcount are deprecated
    //Publish operator
      // let source$ = interval(1000).pipe(publish()) as Connectable<number>;

      // source$.pipe(take(10)).subscribe(data => {
      //   console.log(data);
      // }, err => {
      //   console.log(err);
      // });

      // setTimeout(() => {
      //   source$.pipe(take(10)).subscribe(data => {
      //     console.log(data);
      //   }, err => {
      //     console.log(err);
      //   });
      // }, 4000);
      // source$.connect(); //need to connect after all subscriptions happened.


      //using refCount, we can get rid of .connect method at last.
      // let source$ = interval(1000).pipe(publish(), refCount());
      // //If atleast one subscription is there, refcount will start sending the values.
      // source$.pipe(take(10)).subscribe(data => {
      //   console.log(data);
      // }, err => {
      //   console.log(err);
      // });

      // setTimeout(() => {
      //   source$.pipe(take(10)).subscribe(data => {
      //     console.log(data);
      //   }, err => {
      //     console.log(err);
      //   });
      // }, 4000);



      //share operator --> will start sending the values if at least there is one subscription in the file.
      let source$ = interval(1000).pipe(share());
      source$.pipe(take(10)).subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });

      setTimeout(() => {
        source$.pipe(take(10)).subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err);
        });
      }, 4000);



      
  }
}
