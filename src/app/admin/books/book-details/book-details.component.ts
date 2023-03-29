import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Author } from 'src/app/shared/models/author';
import { Book } from 'src/app/shared/models/book';
import { Genre } from 'src/app/shared/models/genre';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';
import { GenresService } from 'src/app/shared/services/genres.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit{
  
  ThatBook!:Book
  isID!:number
  listAuthor:Author[]=[]
  listGenres:Genre[]=[]
  isRole!: string |null
  removeAuthorFromBook: any
  addAuthorToBook: FormGroup
  removeGenreFromBook: any
  addGenreToBook: FormGroup

  constructor(private _bookService:BookService,
              private _genreService:GenresService,
              private _authorService:AuthorService,
              private _router:Router,
              private _activeRoute:ActivatedRoute,
              private _auth:AuthService,
              private _fb:FormBuilder){
                this.addAuthorToBook = this._fb.group({
                  Author:[[]]
                })
                this.addGenreToBook = this._fb.group({
                  genres:[[]]
                })
                this._auth.isRole.subscribe((value:string|null)=>{
                  this.isRole = value
                })
              }

  ngOnInit(): void {
    

    this.isID=this._activeRoute.snapshot.params['id']
    this._bookService.getById(this.isID).subscribe({
      next:(res:any)=>{
        console.log("ThisBook",res);
        this.ThatBook=res
        console.log(this.ThatBook);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{}
    })
    this._authorService.getAll().subscribe({
      next:(res)=>{
        this.listAuthor=res.values
        console.log(this.listAuthor);
        
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
  editAuthorFunction() {
    console.log("editAuthorFunction");
    console.log(this.addAuthorToBook.value);


    this._bookService.updateAuthorForBook( this.addAuthorToBook.value,this.isID).subscribe({

      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._bookService.getById(this.isID).subscribe({
          next: (res) => {
            this.ThatBook = res
          }
          
        })
      }
    })
  }
  editGenreFunction() {
    console.log("editGenreFunction");
    console.log(this.addGenreToBook.value);


    this._bookService.updateGenreForBook( this.addGenreToBook.value,this.isID).subscribe({

      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._bookService.getById(this.isID).subscribe({
          next: (res) => {
            this.ThatBook = res
          }
          
        })
      }
    })
  }
  deleteAuthor(ID_Author: number) {
    console.log("test");

    let truc = { ID_Author: ID_Author}
    console.log(truc);
    
    this._bookService.deleteAuthorFromBook(this.isID, truc).subscribe({
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._bookService.getById(this.isID).subscribe({
          next: (res) => {
            this.ThatBook = res
          },
          error: (error) => { },
          complete: () => { }
        })
      }
    })
  }
  deleteGenre(ID_genres: number) {
    console.log("deleteGenre");
    console.log(ID_genres);
    
    let truc = { ID_genres: ID_genres }
    console.log(truc);
    
    this._bookService.deleteGenreFromBook(this.isID, truc).subscribe({
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._bookService.getById(this.isID).subscribe({
          next: (res) => {
            this.ThatBook = res
          },
          error: (error) => { },
          complete: () => { }
        })
      }
    })
  }
}
