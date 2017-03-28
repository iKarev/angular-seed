import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { User, LatLng } from './user';

import { UsersListService } from '../shared/users-list/users-list.service';

@Component({
  selector: 'sd-user-new',
  template: `
    <h2 class="users__new_title">New User</h2>
    <p class="users__new_info">To add new user, choose point on the map where he is located</p>
    <sd-user-form (updateUser)="addUser()" *ngIf="user" [geoDataReceived]="geoDataReceived" [user]="user" [newUser]="true" [formSubmited]="formSubmited" [formSent]="formSent"></sd-user-form>
    `
})
export class UserNewComponent implements OnInit, OnDestroy {

  public user: User = {name: '', email: '', address: {geo: {lat: '', lng: ''}}, company: {name: ''}};
  public formSubmited: boolean;
  public formSent: boolean;
  public geoDataReceived: boolean;

  constructor(private usersListService: UsersListService, private router: Router) {}

  ngOnInit() {
    setTimeout(()=>{
      this.usersListService.onChangeUserAddingProgress(true);
    })
    this.usersListService.sendUser.subscribe((user: User) => {
      if (user && user.id) this.routeToUser(user);
      else {
        this.formSent = false;
      }
    });
    this.usersListService.sendLatLng.subscribe((latLng: LatLng) => {
      this.user.address.geo = latLng;
      this.geoDataReceived = true;
    });
  }
  ngOnDestroy () {
    this.usersListService.onChangeUserAddingProgress(false);
  }

  addUser() {
    this.formSent = this.formSubmited = true;
    if (!this.user.name || !this.user.address.geo.lat) {
      this.formSent = false;
      return;
    }

    this.usersListService.updateUser(this.user).subscribe(user => {
      this.formSent = false;
    }, error => console.error(error));
  }

  routeToUser(user: User) {
    this.router.navigate(['/users/'+user.id]);
  }

}
