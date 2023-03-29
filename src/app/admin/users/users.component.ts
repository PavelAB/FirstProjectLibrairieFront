import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  listUser:User[]=[]
  isRole:string|null=''
  constructor(private _userService:UserService,
              private _router:Router,
              private _auth:AuthService){}
  ngOnInit(): void {
    this._auth.isRole.subscribe((role:string|null)=>{
      this.isRole=role
    })
    this._userService.getAll().subscribe({
      next:(res)=>{
        console.log(res.values);
        
        this.listUser=res.values
        console.log(this.listUser);
        
      },
      error:()=>{},
      complete:()=>{}
      
    })
  }
  deleteUser(id:number){
    this._userService.delete(id).subscribe({
      error:(err)=>{
        console.log(err);
        
      },
      complete:()=>{
        this._userService.getAll().subscribe({
          next:(res)=>{            
            this.listUser=res.values
          },
        })
      }
    })
  }
}
