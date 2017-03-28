import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../shared/users-list/users-list.service';
import { Router } from '@angular/router';

import { User } from './user';

/**
 * This class represents the lazy loaded UsersComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-users',
  template: `
    <div class="layout-row ph_8">
      <div class="flex_25">
        <h2 class="users__title">Users</h2>
        <ul class="users__list">
          <li class="users__list-item" *ngFor="let user of users">
            <a class="users__list-item_link" [routerLink]="['/users/', user.id]">{{user.name}}</a>
          </li>
        </ul>
        <p class="users__add">Not enough? <a class="btn btn-info users__add_link" [routerLink]="['/users/new']">Add more!</a></p>
      </div>
      <sd-users-map *ngIf="users.length" 
                    [users]="users" 
                    class="flex_70 p8 users__map"
                    (openUser)="onOpenUser($event)"></sd-users-map>
    </div>
    <router-outlet></router-outlet>`
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public user: User;

  constructor(public usersListService: UsersListService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersListService.get()
      .subscribe(
        users => this.users = users,
        error => console.error(error)
      );
  }

}
