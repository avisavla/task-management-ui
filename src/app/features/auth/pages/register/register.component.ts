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

  constructor(
    private fb:FormBuilder,
    private authService :AuthService
  ) {}

  ngOnInit(){
    this.registerForm = this.fb.group({
      email:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]
    });
  }

  OnSubmit(){
    if(this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: res=>{
        console.log("registration successful");
      },
      error:err=>{
        this.errorMessage = err.error || 'Registration failed';
      }
    });
  }
}
