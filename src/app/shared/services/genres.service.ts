import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Genre, GenreFromBack, newGenre } from '../models/genre';


@Injectable({
  providedIn: 'root'
})
export class GenresService {
  //je stocke le chemin de mon url pour ne pas reecrire plusieurs fois
  private _genreUrl = 'http://localhost:8080/api/genres'
  
  constructor(private _httpClient : HttpClient) { }

  getAll():Observable<GenreFromBack>{
    return this._httpClient.get<GenreFromBack>(this._genreUrl)
  }
  getByID(id:number):Observable<Genre>{
    return this._httpClient.get<Genre>(this._genreUrl+"/"+id) //string+number-->string
  }
  create(genreToCreate:Genre):Observable<Genre>{ 
    return this._httpClient.post<Genre>(this._genreUrl+"",genreToCreate)
  }
  update(id:number,genreToUpdate:Genre):Observable<any>{
    return this._httpClient.put(this._genreUrl+"/"+id,genreToUpdate)
  }
  updatedeleteBookFromGenre(id:number,genreToUpdate:any):Observable<any>{
    return this._httpClient.put("http://localhost:8080/api/genres/deleteBook/"+id,genreToUpdate)
  }
  delete(id:number):Observable<any>{ // vu que je ne recois rien comme info je met <any> en valeur de retour 
    return this._httpClient.delete(this._genreUrl+"/"+id) // si j'ai rien a envoyer j'ecris rien
  }
}
