import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserNewComponent } from './user-new.component';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form.component';
import { UsersMapComponent } from './users-map.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsersListService } from '../shared/users-list/users-list.service';

@NgModule({
  imports: [UsersRoutingModule, ReactiveFormsModule, SharedModule, CommonModule],
  declarations: [UsersComponent, UserComponent, UserNewComponent, UsersMapComponent, UserFormComponent],
  exports: [UsersComponent],
  providers: [UsersListService]
})
export class UsersModule { }
