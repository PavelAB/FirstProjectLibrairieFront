import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { GenresComponent } from './genres/genres.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { GenreCreateComponent } from './genres/genre-create/genre-create.component';
import { GenreUpdateComponent } from './genres/genre-update/genre-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookUpdateComponent } from './books/book-update/book-update.component';
import { AuthorCreateComponent } from './authors/author-create/author-create.component';
import { AuthorUpdateComponent } from './authors/author-update/author-update.component';
import { OrderCreateComponent } from './orders/order-create/order-create.component';
import { OrderUpdateComponent } from './orders/order-update/order-update.component';
import { GenreDetailsComponent } from './genres/genre-details/genre-details.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { OrdersForUserComponent } from './orders/orders-for-user/orders-for-user.component';


@NgModule({
  declarations: [
    GenresComponent,
    BooksComponent,
    AuthorsComponent,
    OrdersComponent,
    UsersComponent,
    GenreCreateComponent,
    GenreUpdateComponent,
    BookCreateComponent,
    BookUpdateComponent,
    AuthorCreateComponent,
    AuthorUpdateComponent,
    OrderCreateComponent,
    OrderUpdateComponent,
    GenreDetailsComponent,
    OrderDetailsComponent,
    BookDetailsComponent,
    UserDetailsComponent,
    OrdersForUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
