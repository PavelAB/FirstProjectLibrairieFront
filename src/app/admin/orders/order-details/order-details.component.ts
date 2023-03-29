import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BookForGenre } from 'src/app/shared/models/book';
import { Order } from 'src/app/shared/models/order';
import { BookService } from 'src/app/shared/services/book.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{

  listeBook:BookForGenre[]=[]
  id!:string
  isOrder!:Order

  constructor(private _orderService : OrderService,
              private _route:Router,
              private _auth:AuthService,
              private _bookService:BookService,
              private _fb:FormBuilder,
              private _activeRoute:ActivatedRoute){
    this.id = this._activeRoute.snapshot.params['id']
    this._orderService.getById(this.id).subscribe({
      next:(res)=>{  
        console.log(res);
              
        this.isOrder=res
      }
    })
  }

  ngOnInit(): void {
    this._bookService.getAll().subscribe({
      next: (res) => {
        
        this.listeBook = res.values
      },
      error: () => { },
      complete: () => { }
    })
  }
}
