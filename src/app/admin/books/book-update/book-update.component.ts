import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Author } from 'src/app/shared/models/author';
import { Genre } from 'src/app/shared/models/genre';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';
import { GenresService } from 'src/app/shared/services/genres.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit{
  editBook:FormGroup
  id:number
  isRole!:string|null
  listAuthor:Author[]=[]
  listGenres:Genre[]=[]

  constructor(private _bookService:BookService,
              private _genreService:GenresService,
              private _authorService:AuthorService,
              private _auth:AuthService,
              private _router:Router,
              private _activRouter:ActivatedRoute,
              private _fb:FormBuilder){
    this.id = this._activRouter.snapshot.params['id']
    this.editBook = this._fb.group({
      title:[null,Validators.required],
      price:[null,Validators.required],
      entry_date:[null,Validators.required],
      isSale:[false],
      genres:[[]],
      Author:[[]]
    })  
    }
  
  ngOnInit(): void {
    this._auth.isRole.subscribe((value:string|null)=>{this.isRole=value})
    this._authorService.getAll().subscribe({
      next:(res)=>{
        this.listAuthor=res.values
      },
      complete:()=>{}
    })
    this._genreService.getAll().subscribe({
      next:(res)=>{
        this.listGenres=res.values
      },
      complete:()=>{}
    })
    this._bookService.getById(this.id).subscribe({
      next:(res)=>{
        console.log(res);
        let AuthorsForThisBook = res.Author.map((x:any)=>x.ID_Author)
        let GenresForThisBook = res.Genres.map((x:any)=>x.ID_genres)
        this.editBook.patchValue({
          title:res.title,
          price:res.price,
          entry_date:res.entry_date,
          isSale:false,
          genres:GenresForThisBook,
          Author:AuthorsForThisBook
        })
      },
      error: (error) => { },
      complete: () => { }
    })
  }
  editBookFunction() {
    console.log("editGenreFunction");
    console.log(this.editBook.value);

    this._bookService.update( this.editBook.value,this.id).subscribe({

      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._router.navigateByUrl('/admin/books')
      }
    })
  }


}
