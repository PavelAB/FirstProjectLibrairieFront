import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';
import { GenresService } from 'src/app/shared/services/genres.service';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.scss']
})
export class AuthorCreateComponent {

//   listeBook:BookForGenre[]=[]
//   newGenre: FormGroup
//   selectedTeam:number=0
//   selectedBooks:number[]=[]

//   constructor(private _fb: FormBuilder,
//     private _authorService: AuthorService,
//     private _route: Router,
//     private _bookService:BookService) {
//     this.newGenre = _fb.group({
//       name_genres: [null, Validators.required],
//       Books:[[]]
//     })
//   }
//   ngOnInit(): void {
//     this._bookService.getAll().subscribe({
//       next: (res) => {
//         this.listeBook = res.values},
//       error: () => { },
//       complete: () => {}
//     })
//   }
//   onBookSelect(event:any){
    
//     this.selectedBooks=event.target.value
    
//   }

//   createNewGenre() {
//     console.log(this.newGenre.value);
//       this._authorService.create(this.newGenre.value).subscribe({
//       next: () => {
//       },
//       error: () => { },
//       complete: () => {
//         this._route.navigateByUrl('admin/genre')
//       }
//     })

  

  
// }

}
