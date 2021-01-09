import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})
export class DatabasesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private databaseService : DatabaseService,
    private router : Router,
  ) {


   }

  ngOnInit(): void {
    // console.log("URL: " + JSON.stringify(this.router.url));
    //
    // this.route.parent.params.subscribe(params => console.log(params)); //
    //
    // this.route.paramMap.subscribe(params => {
    //   console.log(params.get("address"))
    // });
    //
    // const db_address = this.route.snapshot.params.address;
    // debugger;
    // this.databaseService.setDatabase(db_address);
    // console.log("SETTING DATABASE ADDRESS: " + db_address);

    // this.route.snapshot.params.subscribe((params) => {
    //   console.log("DATABASES Component 1");
    //   console.log(params);
    //   console.log("DATABASES Component 2");
    //
    // });
  }
}
