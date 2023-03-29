import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Order } from 'src/app/shared/models/order';
import { BookService } from 'src/app/shared/services/book.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  listOrder:Order[]=[]
  selectedID:number[]=[]
  isRole:string|null=''
  constructor(private _orderService:OrderService,
              private _router:Router,
              private _auth:AuthService,
              private _bookService:BookService){}
  ngOnInit(
  ): void {
    this._auth.isRole.subscribe((role:string|null)=>{
      this.isRole=role
    })
    this._orderService.getAll().subscribe({
      next:(res)=>{
        this.listOrder=res.values
      },
      error:()=>{},
      complete:()=>{}
      
    })
  }
  getSelectedID(){
    this.selectedID=this._bookService.getSelectedBooksID()
    console.log(this.selectedID);
    
  }
  deleteOrder(id:number){ 
    this._orderService.delete(id).subscribe({
      error:(err)=>{
        console.log(err);
        
      },
      complete:()=>{
        this._orderService.getAll().subscribe({
          next:(res)=>{            
            this.listOrder=res.values
          },
        })
      }
    })
  }
}
