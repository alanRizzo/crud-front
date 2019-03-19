import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {
  client: any;
  loading = false;

  constructor(private homeService: HomeService) {
    this.client = {};
    this.loading = true;
  }

  ngOnInit() {
    this.homeService.client()
      .subscribe(
        data => {
          this.loading = false;
          this.client = data;
        },
        error => {
          //  this.alertService.error(error);
          this.loading = false;
          console.log(error);
        });
  }

}
