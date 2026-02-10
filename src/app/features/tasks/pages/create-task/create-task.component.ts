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
      Name:['',Validators.required],
      Description:['']
    });
  }

  OnSubmit(){
    this.taskService.createTasks(this.createTaskForm.value).subscribe({
      next:res=>{
        this.successMessage = 'Task Created successfully';
        window.location.href = 'http://localhost:4200/task';
      },
      error:err=>{
        if (err.status === 400 && err.error?.errors) 
        {
            Object.keys(err.error.errors).forEach(field => {
              this.createTaskForm.get(field)?.setErrors({
                serverError: err.error.errors[field]
              });
            });
        }
        else if(err.status === 400)
          this.errorMessage = err.error;
        else if (err.status === 500)
          this.errorMessage = "Server error. Try later.";
        else if (err.status === 0)
          this.errorMessage = "Backend not reachable";
        else
          this.errorMessage = "Task not created";
      
      }
    })
  }
}
