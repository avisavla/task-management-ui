import { Component } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm !: FormGroup;
  errorMessage = '';
  isLoading=false;
  passwordFieldType = 'password';

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      UserName:['',Validators.required],
      Password:['',Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  OnSubmit(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); 
      return;
    }
    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: res=>{
        this.tokenService.setToken(res.token);
        window.location.href = 'http://localhost:4200/task';
        this.isLoading = false;
      },
      error:err=>{
        if (err.status === 400 && err.error?.errors) 
        {
            Object.keys(err.error.errors).forEach(field => {
              this.loginForm.get(field)?.setErrors({
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
        this.isLoading = false;
      }
    });
  }

}
