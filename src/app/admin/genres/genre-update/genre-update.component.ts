import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookForGenre } from 'src/app/shared/models/book';
import { Genre, GenreDataEdit } from 'src/app/shared/models/genre';
import { BookService } from 'src/app/shared/services/book.service';
import { GenresService } from 'src/app/shared/services/genres.service';

@Component({
  selector: 'app-genre-update',
  templateUrl: './genre-update.component.html',
  styleUrls: ['./genre-update.component.scss']
})
export class GenreUpdateComponent implements OnInit {

  editGenre: FormGroup
  id: number
  listeBook: BookForGenre[] = []
  selectedBooks: number[] = []


  constructor(private _genreService: GenresService,
              private _router: Router,
              private _activeRoute: ActivatedRoute,
              private _fb: FormBuilder,
              private _bookService: BookService) {
     this.editGenre = this._fb.group({
      name_genres: [null, Validators.required],
      Books: [[]]
    })
    
    this.id = parseInt(this._activeRoute.snapshot.params['id'])
  }


  ngOnInit(): void {
    this._bookService.getAll().subscribe({
      next: (res) => {
        this.listeBook = res.values
      },
      error: () => { },
      complete: () => { }
    })
    this._genreService.getByID(this.id).subscribe({
      next: (res) => {
        let test = res.Books.map(x=>x.ISBN)
        console.log(test);
        
        this.editGenre.patchValue({
          name_genres: res.name_genres,
          Books: test
        })

      },
      error: (error) => { },
      complete: () => { }
    })
  }

  // deleteBookFromGenre(){
  //   this._genreService.updatedeleteBookFromGenre(this.id)
  // }

  editGenreFunction() {
    console.log("editGenreFunction");
    console.log(this.editGenre.value);

    this._genreService.update(this.id, this.editGenre.value).subscribe({

      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._router.navigateByUrl('/admin/genre')
      }
    })
  }
  onBookSelect(event: any) {

    this.selectedBooks = event.target.value

  }

}