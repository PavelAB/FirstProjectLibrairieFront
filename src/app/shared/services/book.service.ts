import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookFromSuccesResponse } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _selectedBooksID:number[]=[]
  private _bookUrl = 'http://localhost:8080/api/books/'

  constructor(private _http:HttpClient ) { }

  getAll():Observable<BookFromSuccesResponse>{
    return this._http.get<BookFromSuccesResponse>(this._bookUrl)    
  }
  getById(id:number):Observable<any>{
    return this._http.get<any>(this._bookUrl+id)
  }
  create(newBook:Book):Observable<Book>{
    return this._http.post<Book>(this._bookUrl,newBook)
  }
  update(newBook:Book,id:number):Observable<any>{
    return this._http.put(this._bookUrl+id,newBook)
  }
  updateAuthorForBook(newBook:Book,id:number):Observable<any>{
    return this._http.put(this._bookUrl+"AuthorForBook/"+id,newBook)
  }
  updateGenreForBook(newBook:Book,id:number):Observable<any>{
    return this._http.put(this._bookUrl+"GenresForBook/"+id,newBook)
  }
  deleteAuthorFromBook(id:number,authorToUpdate:any):Observable<any>{
    return this._http.put(this._bookUrl+"deleteAuthor/"+id,authorToUpdate)
  }
  deleteGenreFromBook(id:number,authorToUpdate:any):Observable<any>{
    return this._http.put(this._bookUrl+"deleteGenre/"+id,authorToUpdate)
  }
  delete(id:number):Observable<any>{
    return this._http.delete(this._bookUrl+id)
  }
  setSelectedBooksID(id:number){
    if(this._selectedBooksID.includes(id)){

    }else
      this._selectedBooksID.push(id)
  }
  removeSelectedBooksID(id:number){
    this._selectedBooksID = this._selectedBooksID.filter(test => id !== test);}
  getSelectedBooksID(){
    return this._selectedBooksID
  }
  setToZeroSelectedBooksID(){
    this._selectedBooksID=[]
  }


}
