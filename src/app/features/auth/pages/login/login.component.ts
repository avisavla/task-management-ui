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

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    });
  }

  OnSubmit(){
    if(this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: res=>{
        this.tokenService.setToken(res.token);
      },
      error:err=>{
        this.errorMessage = err.error || 'Login failed';
      }
    });
  }

}
