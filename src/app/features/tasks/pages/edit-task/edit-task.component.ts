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
          name:[''],
          description:[''],
          status:['']
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
          name:res.name,
          description:res.description,
          status:res.status
        });
      },
      error:err=>{
        this.errorMessage = err.error;
      }
    });
  }

  OnSubmit(){
    this.taskService.updateTask(this.editTaskForm.value).subscribe({
      next:(res)=>{
        this.successMessage='Task Updated Successfully'
        window.location.href = 'http://localhost:4200/task';
      },  
      error:err=>{
        this.errorMessage = err.error || 'Update task failed';
      }
    })

  }
}
