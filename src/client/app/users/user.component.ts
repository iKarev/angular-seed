import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { User } from './user';

import { UsersListService } from '../shared/users-list/users-list.service';

/**
 * This class represents the lazy loaded UsersComponent.
 */
@Component({
  selector: 'sd-user',
  template: `
    <div *ngIf="user">
      <h2 class="users__new_title">{{user.name}}</h2>
      <sd-user-form (deleteUser)="onUserDelete()" (updateUser)="updateUser()" *ngIf="user" [user]="user" [formSent]="formSent"></sd-user-form>
    </div>
    `
})
export class UserComponent implements OnInit {

  private subscription: Subscription;
  private user: User;
  private params: any;
  private formSent: boolean;

  public userForm: FormGroup;

  /**
   * @param {UsersListService} usersListService - The injected UsersListService.
   */
  constructor(private usersListService: UsersListService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit () {
    this.usersListService.sendUser.subscribe((user: User) => {
      this.user = user;
    });
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.params = params;
      var len = this.usersListService.getUsersLength();
      if (len > 0) {                      // Если список пользователей загружен
        this.setUser(this.params.number);
      } else if (this.params.number > 10) // Изначально фэйковых пользователей только 10
        this.router.navigate(['/users']);
      else {                              // Если это один из дефолтных, подождем, когда загрузятся данные
        this.usersListService.setRequiredUser(this.params.number);
      }
    }, error => console.error(error));
  }

  onUserDelete() {
    this.usersListService.onDeleteUser(this.user.id).then((status: boolean) => {
      if (status === true)
        this.router.navigate(['/users']);
      else
        alert('Произошла ошибка, попробуйте позже');
    });
  }

  setUser (id?: number) {
    if (id) this.user = this.usersListService.findUser(id);
    this.usersListService.openUserMarker(id);
    console.log(this.user);
  }

  updateUser () {
    this.formSent = true;
    this.usersListService.updateUser(this.user).subscribe(user => {
      this.user = user;
    }, error => console.error(error));
  }

}
