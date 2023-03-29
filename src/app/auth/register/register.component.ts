import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { newAccount } from '../models/newAccount';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  
  registerForm:FormGroup

  constructor(  private _auth:AuthService,
                private _router:Router,
                private _fb:FormBuilder){
                    this.registerForm=this._fb.group({
                      firstname:[null,Validators.required],
                      lastname:[null,Validators.required],
                      login:[null,Validators.required],
                      password:[null,Validators.required]
                    })

                  
                  }
  
  ngOnInit(): void {
    
  }
  newAccount(){
    //console.log(this.registerForm.value);
    this._auth.register(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res.ID_User.toString());
        console.log(res.role);
        console.log(res.token);
        localStorage.setItem('token',res.token)
        localStorage.setItem('id',res.ID_User.toString())
        localStorage.setItem('role',res.role)

        this._auth.connect()
       },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        this._router.navigateByUrl('')
      }
    })
    
  }
  
  

}
