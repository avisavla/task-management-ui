import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm !: FormGroup;
  errorMessage='';
  successMessage='';

  constructor(
    private fb:FormBuilder,
    private authService :AuthService
  ) {}

  ngOnInit(){
    this.registerForm = this.fb.group({
      Email:['',Validators.required],
      UserName:['',Validators.required],
      Password:['',Validators.required]
    });
  }

  OnSubmit(){
    if(this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: res=>{
        this.successMessage = 'User Created successfully';
        window.location.href = 'http://localhost:4200/login';
      },
      error:err=>{
        if (err.status === 400 && err.error?.errors) 
        {
            Object.keys(err.error.errors).forEach(field => {
              this.registerForm.get(field)?.setErrors({
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
    });
  }

  goBack(){
    window.history.back();
  }
}
