import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayScreenComponent } from './display-screen.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:DisplayScreenComponent
  }
]

@NgModule({
  declarations: [
    DisplayScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DisplayScreenModule { }
