import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { UserNewComponent } from './user-new.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'users', 
        component: UsersComponent,
        children: [{
          path: 'new',
          component: UserNewComponent
        },{
          path: ':number',
          component: UserComponent
        }]
      }
    ])
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
