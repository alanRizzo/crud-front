import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomeService } from '../../services/home.service';
import { Move } from '../../models/move';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  movementAddForm: FormGroup;
  movementEditForm: FormGroup;
  returnUrl: string;
  accountId: number;
  move: Move;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService
  ) {
    this.homeService.currentAccount$.subscribe(x => (this.accountId = x));
    this.homeService.currentMove$.subscribe(x => (this.move = x));
  }

  ngOnInit() {
    this.movementAddForm = this.formBuilder.group({
      add_description: ['', Validators.required],
      add_amount: ['', Validators.required]
    });

    this.movementEditForm = this.formBuilder.group({
      edit_description: [this.move.description, Validators.required],
      edit_amount: [this.move.amount, Validators.required]
    });
  }

  // ADD
  // convenience getter for easy access to form fields
  get f() {
    return this.movementAddForm.controls;
  }

  onAddSubmit() {
    this.homeService
      .addMovement(
        this.f.add_description.value,
        this.accountId,
        this.f.add_amount.value
      )
      .subscribe(
        data => {
          // this.homeService.accounts();
          this.movementAddForm.reset();
        },
        error => {
          //  this.alertService.error(error);
          console.log(error);
        }
      );
  }

  onAddCancel() {
    this.movementAddForm.reset();
  }

  // EDIT
  // convenience getter for easy access to form fields
  get g() {
    return this.movementEditForm.controls;
  }

  onEditSubmit() {
    this.homeService
      .editMovement(
        this.g.edit_description.value,
        this.move.id,
        this.g.edit_amount.value
      )
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          //  this.alertService.error(error);
          console.log(error);
        }
      );
  }

  onEditCancel() {
    this.movementEditForm.reset();
  }

  onEditDelete() {
    this.homeService.deleteMovement(this.move.id).subscribe(
      data => {
        this.ngOnInit();
        console.log(data);
      },
      error => {
        //  this.alertService.error(error);
        console.log(error);
      }
    );
  }
}
