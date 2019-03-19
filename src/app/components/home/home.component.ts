import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
}
