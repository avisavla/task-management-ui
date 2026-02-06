import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './pages/task-list/task-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { CreateTaskComponent } from './pages/create-task/create-task.component';


@NgModule({
  declarations: [
    TaskListComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatProgressSpinnerModule,
    ɵInternalFormsSharedModule,
    FormsModule,
    ReactiveFormsModule
]
})
export class TasksModule { }
