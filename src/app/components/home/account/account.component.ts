import { Component, OnInit, DoCheck } from '@angular/core';

import { HomeService } from '../../../services/home.service';
import { Move } from '../../../models/move';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, DoCheck {
  accounts: any;

  refresh = false;
  loading = false;

  constructor(private homeService: HomeService) {
    this.homeService.refreshAccount$.subscribe(x => (this.refresh = x));
    this.loading = true;
  }

  getAccounts() {
    this.homeService.accounts()
      .subscribe(
        data => {
          this.loading = false;
          this.accounts = data;
        },
        error => {
          //  this.alertService.error(error);
          this.loading = false;
          console.log(error);
        });
  }

  ngOnInit() {
    this.getAccounts();
  }

  ngDoCheck() {
    if (this.refresh) {
      this.getAccounts();
      this.refresh = false;
    }
  }

  moveSelected(move: Move): void {
    this.homeService.setMove(move);
  }
}
