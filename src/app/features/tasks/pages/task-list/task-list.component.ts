import { Component,OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../model/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit{
  
  tasks:Task[]=[];
  isLoading = false;
  pageNo=1;
  pageSize=5;

  constructor(private taskServie:TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.isLoading=true;

    this.taskServie.getTasks(this.pageNo,this.pageSize).subscribe({
      next:(res)=>{
        this.tasks = res.items;
        this.isLoading = false;
      },
      error:()=>{
        this.isLoading = false;
      }
    });
  }
}
