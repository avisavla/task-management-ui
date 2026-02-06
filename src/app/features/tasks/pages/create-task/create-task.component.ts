import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  createTaskForm!:FormGroup;
  errorMessage='';
  successMessage='';

  constructor(
    private fb:FormBuilder,
    private taskService:TaskService
  ) {}

  ngOnInit(){
    this.createTaskForm = this.fb.group({
      name:['',Validators.required],
      description:['']
    });
  }

  OnSubmit(){
    this.taskService.createTasks(this.createTaskForm.value).subscribe({
      next:res=>{
        this.successMessage = 'Task Created successfully';
      },
      error:err=>{
        this.errorMessage = err.error || 'Task not created';
      }
    })
  }
}
