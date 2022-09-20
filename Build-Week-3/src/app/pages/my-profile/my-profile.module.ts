import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';


@NgModule({
  declarations: [
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    NzDescriptionsModule
  ]
})
export class MyProfileModule { }
