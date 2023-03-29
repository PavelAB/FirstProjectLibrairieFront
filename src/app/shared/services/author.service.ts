import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author, AuthorFromBack } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private _authorURL = 'http://localhost:8080/api/author/'
  constructor(private _http:HttpClient) { }

  getAll():Observable<AuthorFromBack>{
    return this._http.get<AuthorFromBack>(this._authorURL)
  }
  getById(id:number):Observable<Author>{
    return this._http.get<Author>(this._authorURL+id)
  }
  create(newAuthor:Author):Observable<Author>{
    return this._http.post<Author>(this._authorURL,newAuthor)
  }
  update(newAuthor:Author,id:number):Observable<any>{
    return this._http.put(this._authorURL+id,newAuthor)
  }
  delete(id:number):Observable<any>{
    return this._http.delete(this._authorURL+id)
  }
}
