import { Component, OnInit } from '@angular/core';
import { map, mergeMap, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit {
  //Returns an Observable that emits items based on applying a function that you supply to each item emitted by the source Observable, 
  //where that function returns an Observable, and then merging those resulting Observables and emitting the results of this merger.
  ngOnInit(): void {

    //  **************** Higher order opeators ****************
      of(1,2,3,4) //outer observable
      .pipe(map(val => {
        return of(val * 10) //inner observable
      })).subscribe(data => {
        console.log(data); // It will print only observable not the value
      });

      //To get data, we need to subscribe to to inner observable also
      of(1,2,3,4) //outer observable
      .pipe(map(val => {
        return of(val * 10) //inner observable
      })).subscribe(data => { //data is containing all inner observables
        data.subscribe(value => console.log(value)); // subscribing to inner observable
      });


      //To overcome this, we can user higher order operators
      of(1,2,3,4) //outer observable
      .pipe(
        map(val => {
          return of(val * 10) //inner observable
        }),
        mergeMap(data => data) //it will automatically subscribe to the inner observable and return the data
      ).subscribe(data => { 
        console.log(data); // No need to subscribe to the inner observable again
      });


      // In above example, we can replace the map with mergeMap, and result will be same.
      of(1,2,3,4) //outer observable
      .pipe(
        mergeMap(val => {
          return of(val * 10)
        })
      ).subscribe(data => { 
        console.log(data); 
      });



      // ******************* mergeMap ****************
      of(1,2,3,4,5).pipe(mergeMap(id => { //1st parameter --> project
        return ajax(`https://jsonplaceholder.typicode.com/posts/${id}`)
      },(outerValue, innerValue, outerIndex, innerIndex) => { //2nd parameter --> resultSelector
          return innerValue.response;
      }, 1 //3rd parameter --> current --> how many concurrent observables are executed.
      )).subscribe(data => {
        console.log(data); // may not be in the same order as number is being passed, some may take longer time and may come late.
      }, err => {
        console.log(err);
      });
  }
}
