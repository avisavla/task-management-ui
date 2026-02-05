import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './pages/task-list/task-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule,ɵInternalFormsSharedModule } from "@angular/forms";


@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatProgressSpinnerModule,
    ɵInternalFormsSharedModule,
    FormsModule
]
})
export class TasksModule { }
