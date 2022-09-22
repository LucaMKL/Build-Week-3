import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSharedFormModule } from 'src/app/shared/ng-zorro/nz-shared-form.module';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { UserDataComponent } from './user-data/user-data.component';
import { UserPostComponent } from './user-post/user-post.component';



@NgModule({
  declarations: [
    MyProfileComponent,
    UserDataComponent,
    UserPostComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    NzDescriptionsModule,
    NzAvatarModule,
    NzSharedFormModule,
    NzToolTipModule
  ]
})
export class MyProfileModule { }
