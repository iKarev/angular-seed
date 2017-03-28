import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from './user';

@Component({
  selector: 'sd-user-form',
  template: `
    <form class="users__new_form" (ngSubmit)="onUpdateUser()">
        <div class="users__new_form-group layout-row layout-align-start-center">
          <p class="disp-ib users__new_form-group-title flex_15">User Name</p>
          <p class="flex_50 ph4 disp-ib relative">
            <input class="users__new_form-input" name="name" [(ngModel)]="user.name" type="string" placeholder="Name">
            <span *ngIf="!user.name && formSubmited" class="absolute users__new_form-error">Set user's name</span>
          </p>
          <p class="flex_35 ph4 disp-ib"><input class="users__new_form-input" name="username" [(ngModel)]="user.username" type="string" placeholder="User Name"></p>
        </div>
        <div class="users__new_form-group layout-row layout-align-start-center">
          <p class="disp-ib users__new_form-group-title flex_15">User Contacts</p>
          <p class="flex_30 ph4 disp-ib"><input class="users__new_form-input" name="email" [(ngModel)]="user.email" type="email" placeholder="Email"></p>
          <p class="flex_20 ph4 disp-ib"><input class="users__new_form-input" name="phone" [(ngModel)]="user.phone" type="phone" placeholder="Phone"></p>
          <p class="flex_35 ph4 disp-ib"><input class="users__new_form-input" name="website" [(ngModel)]="user.website" type="string" placeholder="Website"></p>
        </div>
        <div class="users__new_form-group layout-row layout-align-start-center">
          <p class="disp-ib users__new_form-group-title flex_15">User Address</p>
          <p class="flex_25 ph4 disp-ib"><input class="users__new_form-input" name="addressCity" [(ngModel)]="user.address.city" type="string" placeholder="City"></p>
          <p class="flex_35 ph4 disp-ib"><input class="users__new_form-input" name="addressStreet" [(ngModel)]="user.address.street" type="string" placeholder="Street"></p>
          <p class="flex_10 ph4 disp-ib"><input class="users__new_form-input" name="addressSuite" [(ngModel)]="user.address.suite" type="string" placeholder="Suite"></p>
          <p class="flex_15 ph4 disp-ib"><input class="users__new_form-input" name="addressZipcode" [(ngModel)]="user.address.zipcode" type="string" placeholder="Zipcode"></p>
        </div>
        <div class="users__new_form-group layout-row layout-align-start-center">
          <p class="disp-ib users__new_form-group-title flex_15">User Company</p>
          <p class="flex_20 ph4 disp-ib"><input class="users__new_form-input" name="companyName" [(ngModel)]="user.company.name" type="phone" placeholder="Company Name"></p>
          <p class="flex_30 ph4 disp-ib"><input class="users__new_form-input" name="companyBs" [(ngModel)]="user.company.bs" type="string" placeholder="Company Specialization"></p>
          <p class="flex_35 ph4 disp-ib"><input class="users__new_form-input" name="companyCatchPhrase" [(ngModel)]="user.company.catchPhrase" type="email" placeholder="Company Catch Phrase"></p>
        </div>
        <p *ngIf="!geoDataReceived && formSubmited" class="users__new_form-error">Choose user's position on the map</p>
        <div class="users__new_form-bottom layout-row layout-align-space-between-center">
          <button *ngIf="!newUser" class="btn btn-danger users__new_form-button" type="button" (click)="onUserDelete()">Delete</button>
          <button class="btn btn-primary users__new_form-button" type="submit" [disabled]="formSent">{{newUser ? 'Add New User' : 'Update User Info'}}</button>
        </div>
      </form>
    `
})
export class UserFormComponent {

  @Output() deleteUser = new EventEmitter<User>();
  @Output() updateUser = new EventEmitter<User>();
  @Input() user: User[];
  @Input() newUser: boolean;
  @Input() formSent: boolean;
  @Input() formSubmited: boolean;
  @Input() geoDataReceived: boolean;

  constructor() {}

  onUpdateUser() {
    this.updateUser.emit();
  }
  onUserDelete() {
    this.deleteUser.emit();
  }

}
