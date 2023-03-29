import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookForGenre } from 'src/app/shared/models/book';
import { newGenre } from 'src/app/shared/models/genre';
import { BookService } from 'src/app/shared/services/book.service';
import { GenresService } from 'src/app/shared/services/genres.service';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.scss']
})
export class GenreCreateComponent implements OnInit{
  listeBook:BookForGenre[]=[]
  newGenre: FormGroup
  selectedTeam:number=0
  selectedBooks:number[]=[]

  constructor(private _fb: FormBuilder,
    private _genreService: GenresService,
    private _route: Router,
    private _bookService:BookService) {
    this.newGenre = _fb.group({
      name_genres: [null, Validators.required],
      Books:[[]]
    })
  }
  ngOnInit(): void {
    this._bookService.getAll().subscribe({
      next: (res) => {
        this.listeBook = res.values},
      error: () => { },
      complete: () => {}
    })
  }
  onBookSelect(event:any){
    
    this.selectedBooks=event.target.value
    
  }

  createNewGenre() {
    console.log(this.newGenre.value);
      this._genreService.create(this.newGenre.value).subscribe({
      next: () => {
      },
      error: () => { },
      complete: () => {
        this._route.navigateByUrl('admin/genre')
      }
    })

  

  
}
}