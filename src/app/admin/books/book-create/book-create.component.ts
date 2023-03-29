import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Author } from 'src/app/shared/models/author';
import { Book } from 'src/app/shared/models/book';
import { Genre } from 'src/app/shared/models/genre';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';
import { GenresService } from 'src/app/shared/services/genres.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit{
  
  BookToCreate:FormGroup
  listAuthors:Author[]=[]
  listGenres:Genre[]=[]

  constructor(private _bookService:BookService,
              private _authorService:AuthorService,
              private _genreService:GenresService,
              private _auth:AuthService,
              private _router:Router,
              private _activeRouter:ActivatedRoute,
              private _fb:FormBuilder){
    this.BookToCreate = this._fb.group({
      title:[null,Validators.required],
      price:[null,Validators.required],
      entry_date:[null,Validators.required],
      isSale:[false],
      genres:[[]],
      Author:[[]]
    })
  }

  ngOnInit(): void {
    this._authorService.getAll().subscribe({
      next:(res)=>{
        this.listAuthors=res.values
      },
      complete:()=>{}
    })
    this._genreService.getAll().subscribe({
      next:(res)=>{
        this.listGenres=res.values
      },
      complete:()=>{}
    })
  }

  createNewBook(){
    this._bookService.create(this.BookToCreate.value).subscribe({
      complete:()=>{
        this._router.navigateByUrl('admin/books')
      }
    })
  }

}
