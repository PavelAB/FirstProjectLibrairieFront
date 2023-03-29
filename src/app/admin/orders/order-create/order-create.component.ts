import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BookForGenre } from 'src/app/shared/models/book';
import { BookService } from 'src/app/shared/services/book.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit{
  listeBook:BookForGenre[]=[]
  newOrder: FormGroup
  IDOrder:string=this.randomString(6)
  IdUser!:string|null
  currentDate:Date=new Date()
  selectedTeam:number=0
  selectedBooks:number[]=[]

  constructor(private _fb: FormBuilder,
    private _orderService: OrderService,
    private _route: Router,
    private _bookService:BookService,
    private _auth:AuthService) {
    this._auth.isID.subscribe((id:string|null)=>{
      this.IdUser = id
    })
    this.newOrder = _fb.group({
      ID_Order: [this.IDOrder, Validators.required],
      orderDate:[this.currentDate,Validators.required],
      isPaid:[false],
      book:[this._bookService.getSelectedBooksID()],
      UserIDUser:[this.IdUser]
    })
  }

  ngOnInit(): void {
    this._bookService.getAll().subscribe({
      next: (res) => {
        this.listeBook = res.values},
      error: () => { },
      complete: () => {}
    })
  }

  onBookSelect(event:any){
    this.selectedBooks=event.target.value
  }

  createNewOrder() {
    console.log(this.newOrder.value);
      this._orderService.create(this.newOrder.value).subscribe({
      next: () => {
      },
      error: () => { },
      complete: () => {
        this._bookService.setToZeroSelectedBooksID()
        this._route.navigateByUrl('admin/books')
      }
    })
  }
  randomString(length:number){
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result:string=''
    for(let i = 0; i<length;i++ ){
      result += alphabet.charAt(Math.floor(Math.random()*alphabet.length))
    }
    return result
  }
}