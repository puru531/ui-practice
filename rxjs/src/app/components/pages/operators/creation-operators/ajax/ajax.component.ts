import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-ajax',
  templateUrl: './ajax.component.html',
  styleUrls: ['./ajax.component.css']
})
export class AjaxComponent implements OnInit {
  ngOnInit(): void {
      ajax(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((res: any) => {
        let data = [];
        for(let post of res.response) {
          data.push(post.title);
        }
        return data;
        })
      )
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      }, () => {
        console.log('completed');
      });


      //ajas getJson method ---> will return only response data
      ajax.getJSON(`https://jsonplaceholder.typicode.com/posts`).subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });

      //
      ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'POST',
        headers: {
          puru: 'Purushottam Kumar'
        },
        body: {
          school: 'Prerit International School'
        }
      }).subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
}
