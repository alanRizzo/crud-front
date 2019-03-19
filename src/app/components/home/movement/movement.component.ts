import { Component, OnInit, Input } from '@angular/core';

import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styles: []
})
export class MovementComponent implements OnInit {
  @Input() accountId: number;

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
  }

  accountIdSelected(): void {
    this.homeService.setAccountId(this.accountId);
  }
}
