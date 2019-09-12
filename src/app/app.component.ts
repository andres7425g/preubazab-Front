import { GLOBAL } from './services/global';
import { VisitService } from './services/visit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title:string;
  public identity;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _visitService:VisitService
  ){
    this. title = 'NGSOCIAL';
    this.url = GLOBAL.url
  }

  ngOnInit(){
    console.log(this.identity);
    
  }
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
    this._visitService.logout();
  }
}