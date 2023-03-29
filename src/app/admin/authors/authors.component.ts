import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Author } from 'src/app/shared/models/author';
import { AuthorService } from 'src/app/shared/services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit{
  listAuthor:Author[]=[]
  isRole:string|null=''
  constructor(private _authorService:AuthorService,
              private _router:Router,
              private _auth:AuthService){}
  ngOnInit(): void {
    this._authorService.getAll().subscribe({
      next:(res)=>{
        console.log(res.values);
        
        this.listAuthor=res.values
      },
      error:()=>{},
      complete:()=>{}
      
    })
  }
}
