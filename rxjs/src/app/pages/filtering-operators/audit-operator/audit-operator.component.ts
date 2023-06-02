import { Component, OnInit } from '@angular/core';
import { audit, interval } from 'rxjs';

@Component({
  selector: 'app-audit-operator',
  templateUrl: './audit-operator.component.html',
  styleUrls: ['./audit-operator.component.css']
})
export class AuditOperatorComponent  implements OnInit {
    ngOnInit(): void {
        interval(1000).pipe(audit(val => interval(2000))).subscribe(data => console.log(data));
    }
    // 0 comes and sent to audit, it will take 2 seconds till then 1 and 2 are emitted--> so audit will emit 2 beause it is latest
    //again 3 comes to audit, it will take 2 seconds till then 4 and 5 are emitted --> so audit will emit 5 beause it is latest
}
