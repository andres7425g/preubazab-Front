import { VisitService } from '../../services/visit.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { Visit } from 'src/app/models/visit';

@Component({
    selector: 'tableVisit',
    templateUrl : './tableVisit.component.html',
    providers : [VisitService ]
})

export class TableComponent implements OnInit{
    
    public title: string;
    public visit: Visit;
    public status: string;
    public identity;
    public token;
    public stats;
    public url;
    public followed;
    public following;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _visitService: VisitService,
    ){
        this.title = 'Visitas:';
        this.token = this._visitService.getToken();
        this.url = GLOBAL.url;
        this.followed = false;
        this.following = false;
    }

    ngOnInit(){
        console.log('Perfil cargado exitosamente');    
        this.loadPage();
    }

    loadPage(){
        this._route.params.subscribe(params => {
            let id = params['id'];

            this.getVisit(id);
        });
    }

    getVisit(id){
        this._visitService.getVisit(id).subscribe(
            response => {
                if(response.visit){
                    console.log(response);
                    
                    this.visit = response.visit;

                    if(response.following &&  response.following._id ){
                        this.following = true;
                    }else{
                        this.following = false;
                    }
                    if(response.following && response.followed._id){
                        this.followed = true;
                    }else{
                        this.followed = false;
                    }

                }else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/', this.identity._id]);
            }
        )
    }

    refresh(event = null){
        console.log(event);
        this.getVisit(1);   
    }

    deleteVisit(id){
        this._visitService.deleteVisit(id).subscribe(
            response => {
                this.refresh();
            },
            error => {
                console.log(<any>error);
                
            }
        )
    }
}
