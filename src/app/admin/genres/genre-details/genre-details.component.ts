import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BookForGenre } from 'src/app/shared/models/book';
import { Genre } from 'src/app/shared/models/genre';
import { BookService } from 'src/app/shared/services/book.service';
import { GenresService } from 'src/app/shared/services/genres.service';

@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss']
})
export class GenreDetailsComponent {


  editGenre!: Genre
  test!: Genre
  listeBook: BookForGenre[] = []
  isRole!: string |null
  removeBookFromGenre: any
  addBookToGenre: FormGroup
  id: number
  selectedBooks: number[] = []


  constructor(private _genreService: GenresService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _bookService: BookService,
    private _auth:AuthService) {

    this.addBookToGenre = this._fb.group({
      Books: [[]]
    })

    this.id = parseInt(this._activeRoute.snapshot.params['id'])

    this._genreService.getByID(this.id).subscribe({
      next: (res) => {
        this.editGenre = res
      },
      error: (error) => { },
      complete: () => { }
    })

    this._auth.isRole.subscribe((value:string|null)=>{
      this.isRole = value
    })
  }
  ngOnInit(): void {
    this._bookService.getAll().subscribe({
      next: (res) => {
        this.listeBook = res.values
      },
      error: () => { },
      complete: () => { }
    })
  }
  deleteGenre(ISBN: number) {
    console.log("test");

    let truc = { ISBN: ISBN }
    this._genreService.updatedeleteBookFromGenre(this.id, truc).subscribe({
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._genreService.getByID(this.id).subscribe({
          next: (res) => {
            this.editGenre = res
          },
          error: (error) => { },
          complete: () => { }
        })
      }
    })
  }
  editGenreFunction() {
    console.log("editGenreFunction");
    console.log(this.addBookToGenre.value);


    this._genreService.update(this.id, this.addBookToGenre.value).subscribe({

      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._genreService.getByID(this.id).subscribe({
          next: (res) => {
            this.editGenre = res
          },
          error: (error) => { },
          complete: () => {
            this._genreService.getByID(this.id).subscribe({
              next: (res) => {
                this.editGenre = res
              },
              error: (error) => { },
              complete: () => { }
            })
          }
        })
      }
    })
  }
  onBookSelect(event: any) {

    this.selectedBooks = event.target.value

  }
  // deleteBook(){

  // }
}
