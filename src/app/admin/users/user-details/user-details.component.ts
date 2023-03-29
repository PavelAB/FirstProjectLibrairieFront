import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{

  isUser!:User
  IDuser!:number
  UpdateUser:FormGroup
  isRole:string|null=''

  constructor(private _userService:UserService,
              private _router:Router,
              private _auth:AuthService,
              private _activeRoute:ActivatedRoute,
              private _fb:FormBuilder){
    this.UpdateUser = this._fb.group({
      login:[null,Validators.required],
      lastname:[null,Validators.required],
      firstname:[null,Validators.required],
      birth_date:[null,Validators.required]
    })
  }

  ngOnInit(): void {
    this.IDuser=this._activeRoute.snapshot.params['id']
    console.log(this.IDuser);    
    this._auth.isRole.subscribe((role:string|null)=>{
      this.isRole=role
    })
    this._userService.getById(this.IDuser).subscribe({
      next:(res)=>{
        this.UpdateUser.patchValue({
          login:res.login,
          lastname:res.lastname,
          firstname:res.firstname,
          birth_date:res.birth_date 
        })    
        this.isUser = res
        console.log(this.isUser);
        
      },
      error:()=>{},
      complete:()=>{}
      
    })
  }
  updateUser(){
    this._userService.update(this.UpdateUser.value,this.IDuser).subscribe({
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
         this._router.navigateByUrl('')
      }
    })
  }
}
