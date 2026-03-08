import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './pages/task-list/task-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
// import { ProjectCardComponent } from 'src/app/shared/components/project-card/project-card.component';
 import { ProjectModalComponent } from 'src/app/features/tasks/common/components/project-modal/project-modal.component';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { ProjectCardComponent } from './common/components/project-card/project-card.component';
// import { ProjectModalComponent } from './common/components/project-modal/project-modal.component';


@NgModule({
  declarations: [
    TaskListComponent,
    CreateTaskComponent,
    EditTaskComponent,
    //ProjectCardComponent,
    ProjectModalComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatProgressSpinnerModule,
    ɵInternalFormsSharedModule,
    FormsModule,
    ReactiveFormsModule//,
    //SharedModule
]
})
export class TasksModule { }
