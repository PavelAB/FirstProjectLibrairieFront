import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectedGuardGuard } from '../shared/guard/connected-guard.guard';
import { AuthorsComponent } from './authors/authors.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookUpdateComponent } from './books/book-update/book-update.component';
import { BooksComponent } from './books/books.component';
import { GenreCreateComponent } from './genres/genre-create/genre-create.component';
import { GenreDetailsComponent } from './genres/genre-details/genre-details.component';
import { GenreUpdateComponent } from './genres/genre-update/genre-update.component';
import { GenresComponent } from './genres/genres.component';
import { OrderCreateComponent } from './orders/order-create/order-create.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrdersForUserComponent } from './orders/orders-for-user/orders-for-user.component';
import { OrdersComponent } from './orders/orders.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'genre',component:GenresComponent,canActivate:[ConnectedGuardGuard]},
  {path:'genre/create',component:GenreCreateComponent},
  {path:'genre/update/:id',component:GenreUpdateComponent},
  {path:'genre/details/:id',component:GenreDetailsComponent},
  {path:'author',component:AuthorsComponent,canActivate:[ConnectedGuardGuard]}, //ajouter le guard qui protege aussi les sous-liens
  {path:'author/create',component:GenreCreateComponent},
  {path:'author/update/:id',component:GenreUpdateComponent},
  {path:'books',component:BooksComponent},
  {path:'books/create',component:BookCreateComponent},
  {path:'books/update/:id',component:BookUpdateComponent},
  {path:'books/details/:id',component:BookDetailsComponent},
  {path:'orders',component:OrdersComponent},
  {path:'orders/create',component:OrderCreateComponent},
  {path:'orders/details/:id',component:OrderDetailsComponent},
  {path:'orders/ordersForUser',component:OrdersForUserComponent},
  {path:'user',component:UsersComponent},
  {path:'user/details/:id',component:UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
