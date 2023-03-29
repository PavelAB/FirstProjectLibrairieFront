import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { newAccount } from '../models/newAccount';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUrl = 'http://localhost:8080/api/auth/'

  constructor(private _httpClient : HttpClient) { }
  
  //une oservable isConnect pour voir si il y qqn de connecter ou pas
  private _isRole$ : BehaviorSubject<string | null >=
    new BehaviorSubject(localStorage.getItem('role'))
  isRole:Observable<string | null>=this._isRole$.asObservable()

  private _ID$: BehaviorSubject<string|null>=
    new BehaviorSubject(localStorage.getItem('id'))
  isID:Observable<string|null>=this._ID$.asObservable()

  private _isConnected$ : BehaviorSubject<boolean> =
    new  BehaviorSubject((localStorage.getItem('token') && localStorage.getItem('token')!=='')?
    true:false)
  isConnected:Observable<boolean>=this._isConnected$.asObservable() //comme ca je peux pas interagir avec mon observable
  
  register(registerData:any):Observable<newAccount>{
    return this._httpClient.post<newAccount>(this._authUrl+"register",registerData)
  }
  login(registerData:any):Observable<newAccount>{
    return this._httpClient.post<newAccount>(this._authUrl+"login",registerData)
  }
  connect(){
    this._isConnected$.next(true)
    this._isRole$.next(localStorage.getItem('role'))
    this._ID$.next(localStorage.getItem('id'))

  }
  disconnect(){
    localStorage.clear()
    this._isConnected$.next(false)
    this._isRole$.next(null)
    this._ID$.next(null)
    
  }

}
