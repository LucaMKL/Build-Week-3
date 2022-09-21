import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPostComponent } from './show-post.component';



@NgModule({
  declarations: [
    ShowPostComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowPostComponent
  ]
})
export class ShowPostModule { }
