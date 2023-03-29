import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Genre } from 'src/app/shared/models/genre';
import { GenresService } from 'src/app/shared/services/genres.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit{
  
  listeGenres: Genre[]=[]  //ici je stocke mes donnes recu de la bd
  isRole:string|null=''
  constructor(
      private _genreService:GenresService,
      private _router:Router,
      private _isConnected:AuthService,
      private _auth:AuthService){}
  
  ngOnInit(): void { //methode OnInit s'effectue des que la page est lance
    this._auth.isRole.subscribe((role:string|null)=>{
      this.isRole=role
    })
    


    this._genreService.getAll().subscribe({
      next:(res)=>{

        this.listeGenres = res.values // faire attention a mes models, doivent corresponde a donnees que je veux recupere.
        
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{ // a la fin je me desinscrit d'observer
        
      }
    })
  }
    deleteGenre(id:number){
      console.log(id);
      
      this._genreService.delete(id).subscribe({
        
        error:(err)=>{
          console.log("error");
          
          console.log(err);
        },
        complete:()=>{
          console.log("test");
          
         this._genreService.getAll().subscribe((res)=>{this.listeGenres=res.values}) 
        }
      })
    }
  

}
