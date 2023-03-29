import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isRole:string|null=''
  isID:string|null=''
  isConnected:boolean=false
  constructor(private _auth:AuthService,
              private _route:Router){}
  ngOnInit(): void {
    this._auth.isRole.subscribe((role:string|null)=>{
      this.isRole = role
      console.log(" ===== ROLE  ===>>>"+this.isRole);
    })
    this._auth.isID.subscribe((id:string|null)=>{
      this.isID=id
    })
    this._auth.isConnected.subscribe((value:boolean)=>{
      this.isConnected=value
      console.log(value);
      
    })
  }
  logOut(){
    this._auth.disconnect()
    
    this._route.navigateByUrl('')
  }
}
