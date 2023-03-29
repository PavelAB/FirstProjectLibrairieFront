import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Book } from 'src/app/shared/models/book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  listBook:Book[]=[]
  selectedBooks:number[]=[]
  isRole:string|null=''



  constructor(private _bookService:BookService,
              private _router:Router,
              private _auth:AuthService){}
  ngOnInit(): void {
    this._auth.isRole.subscribe((role:string|null)=>{
      this.isRole=role
    })
    this._bookService.getAll().subscribe({
      next:(res)=>{
        console.log(res.values);
        
        this.listBook=res.values
      },
      error:()=>{},
      complete:()=>{}
      
    })
  }
  deleteBook(id:number){
    this._bookService.delete(id).subscribe({
      error:(err)=>{
        console.log(err);        
      },
      complete:()=>{
        this._bookService.getAll().subscribe((res)=>{this.listBook=res.values})
      }
    })
  }
  selectBook(id:number){
    this._bookService.setSelectedBooksID(id)
    console.log(this._bookService.getSelectedBooksID());
    this.selectedBooks=this._bookService.getSelectedBooksID()
  }
  removeBook(id:number){
    this._bookService.removeSelectedBooksID(id)
    console.log(this._bookService.getSelectedBooksID());
    this.selectedBooks=this._bookService.getSelectedBooksID()
  }
  newOrder(){ 
    console.log(this._bookService.getSelectedBooksID());
    
    this._router.navigateByUrl('admin/orders/create')
  }
}
