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
  totalCount=0;

  constructor(private taskServie:TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.isLoading=true;

    this.taskServie.getTasks(this.pageNo,this.pageSize).subscribe({
      next:(res)=>{
        this.tasks = res.items;
        this.totalCount = res.totalCount;
        this.isLoading = false;
      },
      error:()=>{
        this.isLoading = false;
      }
    });
  }

  prevPage(){
    if(this.pageNo>1)
    {
      this.pageNo--;
      this.loadTasks();
    }
  }

  nextPage(){
      this.pageNo++;
      this.loadTasks();
  }

  onPageSizeChange(event:any){
    this.pageSize = event.target.value;
    this.pageNo=1;
    this.loadTasks();
  }

  get showingCount():number{
    return Math.min(this.pageNo*this.pageSize,this.totalCount);
  }
}
