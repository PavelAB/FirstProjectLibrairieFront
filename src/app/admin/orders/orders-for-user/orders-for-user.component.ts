import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Order } from 'src/app/shared/models/order';
import { BookService } from 'src/app/shared/services/book.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders-for-user',
  templateUrl: './orders-for-user.component.html',
  styleUrls: ['./orders-for-user.component.scss']
})
export class OrdersForUserComponent {
  listOrder:Order[]=[]
  isRole:string|null=''
  isID:string|null=''
  constructor(private _orderService:OrderService,
              private _router:Router,
              private _auth:AuthService,
              private _bookService:BookService){}
  ngOnInit(
  ): void {
    this._auth.isRole.subscribe((role:string|null)=>{
      this.isRole=role
    })
    this._auth.isID.subscribe((id:string|null)=>{
      this.isID=id
    })
    this._orderService.getOrdersForUser(this.isID??'').subscribe({
      next:(res)=>{
        console.log(res.values);
        
        this.listOrder=res.values
      },
      error:()=>{},
      complete:()=>{}
      
    })
  }
}
