import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserFromBack } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userURL = 'http://localhost:8080/api/user/'
  constructor(private _http:HttpClient) { }

  getAll():Observable<UserFromBack>{
    return this._http.get<UserFromBack>(this._userURL)
  }
  getById(id:number):Observable<User>{
    return this._http.get<User>(this._userURL+id)
  }
  create(newUser:User):Observable<User>{
    return this._http.post<User>(this._userURL,newUser)
  }
  update(newUser:User,id:number):Observable<any>{
    return this._http.put(this._userURL+id,newUser)
  }
  delete(id:number):Observable<any>{
    return this._http.delete(this._userURL+id)
  }
}
