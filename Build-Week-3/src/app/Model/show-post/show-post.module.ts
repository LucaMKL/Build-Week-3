import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPostComponent } from './show-post.component';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


@NgModule({
  declarations: [
    ShowPostComponent,
  ],
  imports: [
    CommonModule,
    NzCommentModule,
    NzAvatarModule,
    NzIconModule,
    NzListModule,
    NzFormModule,
    NzButtonModule,
    FormsModule,
    NzToolTipModule

  ],
  exports: [
    ShowPostComponent
  ]
})
export class ShowPostModule { }
