import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  {path:'',component:TaskListComponent,canActivate:[AuthGuard]},
  {path:'create',component:CreateTaskComponent,canActivate:[AuthGuard]},
  {path:'edit/:id',component:EditTaskComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
