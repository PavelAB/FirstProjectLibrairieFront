import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuardGuard  {

  isConnected:boolean=false

  constructor(private _isConnected:AuthService,private _router:Router){this._isConnected.isConnected.subscribe((value:boolean)=>{
      this.isConnected=value
    })}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.isConnected)
      return true
    else{
      this._router.navigateByUrl('/login')
      return false}
  }
  
}
