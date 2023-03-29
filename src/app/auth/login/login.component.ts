import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup
  
  constructor(private _fb:FormBuilder,
              private _route:Router,
              private _auth:AuthService){
                this.loginForm=this._fb.group({
                  login:[null,Validators.required],
                  password:[null,Validators.required]
                })
              }
  ngOnInit(): void {
                
  }
  newUserConnect(){
    console.log(this.loginForm);
    
    this._auth.login(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('token',res.token)
        localStorage.setItem('role',res.role)
        localStorage.setItem('id',res.ID_User.toString())
        

        this._auth.connect()

        
      },
      error:(error)=>{
        console.log(error);
        
      },
      complete:()=>{
        this._route.navigateByUrl('')
      }
    })
  }
}
