import { Component,OnInit,Input } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../model/task.model';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import {ProjectModalComponent} from 'src/app/features/tasks/common/components/project-modal/project-modal.component';

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
  status:string='';
  text:string='';
  deleteErrorMessage:string='';
  @Input() task = {} as Task;
  bsModelRef?: BsModalRef;

  constructor(private taskService:TaskService,private modalService:BsModalService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.isLoading=true;

    this.taskService.getTasks(this.status,this.text,this.pageNo,this.pageSize).subscribe({
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

  deleteTask(id:number,name:string){
    const confirmed = confirm("Are you sure you want to delete task "+name+" ?");
    this.deleteErrorMessage='';
    if(!confirmed)
      return;
    this.isLoading=true;

    this.taskService.deleteTask(id).subscribe({
      next:(res)=>{
        this.loadTasks();
        this.isLoading = false;
      },
      error:(err)=>{
        this.handleDeleteError(err);
        this.isLoading = false; 
      }
    });
  }

  handleDeleteError(err:any)
  {
    if(err.status===404)
      this.deleteErrorMessage = "Task with provided id does not exists";

    else if(err.status===409)
      this.deleteErrorMessage = "Task in progress cannot be deleted";
    
    else if(err.status === 400 && err.error)
      this.deleteErrorMessage = err.error;

    else if(err.status === 0)
      this.deleteErrorMessage = "Server unreachable";

    else
      this.deleteErrorMessage = "Failed to delete task";


  }

  createTask(){
      window.location.href = 'http://localhost:4200/task/create';
    }

  editTask(id:number){
    window.location.href = `http://localhost:4200/task/edit/${id}`;
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

  get showingCount():number{
    return Math.min(this.pageNo*this.pageSize,this.totalCount);
  }

  OpenProjectModal(){
      const modalOptions:ModalOptions={
        class:"modal-lg",
        initialState:{
          task:this.task
        }
      };
  
      this.bsModelRef = this.modalService.show(ProjectModalComponent,modalOptions);
    }
}
