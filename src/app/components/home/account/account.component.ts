import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../../services/home.service';
import { Move } from '../../../models/move';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  accounts: any;

  loading = false;

  constructor(private homeService: HomeService) {
    this.loading = true;
  }

  ngOnInit() {
    this.homeService.accounts()
      .subscribe(
        data => {
          console.log('ngOnInit: ', data);
          this.loading = false;
          this.accounts = data;
        },
        error => {
          //  this.alertService.error(error);
          this.loading = false;
          console.log(error);
        });
  }

  moveSelected(move: Move): void {
    this.homeService.setMove(move);
  }
}
