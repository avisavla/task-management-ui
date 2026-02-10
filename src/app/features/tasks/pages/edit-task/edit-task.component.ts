import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  editTaskForm!:FormGroup;
  successMessage='';
  errorMessage='';
  name='';
  status='';
  description='';
  id=0;

  constructor(
    private fb:FormBuilder,
    private taskService:TaskService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(){
    this.editTaskForm = this.fb.group({
          id:[''],
          Name:[''],
          Description:[''],
          Status:['']
        });
    const idString = this.route.snapshot.paramMap.get('id');
    this.id=Number(idString);
    this.getTask(this.id);
  }

  getTask(id:number){
    this.taskService.getTask(id).subscribe({
      next:(res)=>{
        this.editTaskForm.patchValue({
          id:id,
          Name:res.name,
          Description:res.description,
          Status:res.status
        });
      },
      error:err=>{
        this.errorMessage = err.error;
      }
    });
  }

  OnSubmit(){
      if (!['Pending','InProgress','Completed'].includes(this.editTaskForm.value.Status)) 
      {
        this.errorMessage = "Status must be Pending, InProgress, Completed";
        return;
      }
    this.taskService.updateTask(this.editTaskForm.value).subscribe({
      next:(res)=>{
        this.successMessage='Task Updated Successfully'
        window.location.href = 'http://localhost:4200/task';
      },  
      error:err=>{
        if (err.status === 400 && err.error?.errors) 
        {
            Object.keys(err.error.errors).forEach(field => {
              this.editTaskForm.get(field)?.setErrors({
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
