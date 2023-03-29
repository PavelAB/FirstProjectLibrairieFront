import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderFromBack } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _orderURL = 'http://localhost:8080/api/orders/'
  constructor(private _http:HttpClient) { }

  getAll():Observable<OrderFromBack>{
    return this._http.get<OrderFromBack>(this._orderURL)
  }
  getById(id:string):Observable<Order>{
    return this._http.get<Order>(this._orderURL+id)
  }
  create(newOrder:Order):Observable<Order>{
    return this._http.post<Order>(this._orderURL,newOrder)
  }
  update(newOrder:Order,id:number):Observable<any>{
    return this._http.put(this._orderURL+id,newOrder)
  }
  delete(id:number):Observable<any>{
    return this._http.delete(this._orderURL+id)
  }
  getOrdersForUser(id:string):Observable<OrderFromBack>{
    return this._http.get<OrderFromBack>(this._orderURL+"OrdersForUser/"+id)
  }
}
