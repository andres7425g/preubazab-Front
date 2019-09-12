import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Visit } from './../../models/visit';
import { VisitService } from './../../services/visit.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    public title:string;
    public visit: Visit;
    public status: string;
    public identity;
    public token;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _visitService: VisitService
    ){
        this.title = 'Identificate';
        this.visit = new Visit(
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
        );
    }
    ngOnInit(){
        console.log('Componente de login cargado...');
         
    }

    onSubmit() {
        // loguea al usuario y conseguir sus datos
        this._visitService.signup(this.visit).subscribe(
            response => {
                this.identity = response.visit;
                
                if (!this.identity || !this.identity._id) {
                    this.status = 'error';
                } else {
                    // PERSISTIR DATOS DEL USUARIO
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    // Conseguir el token
                    this.getToken();
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        )
    }

    getToken() {
        this._visitService.signup(this.visit, 'true').subscribe(
            response => {
                this.token = response.token;
                console.log(this.token);
                
                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                    // PERSISTIR TOKEN DEL USUARIO
                    localStorage.setItem('token', this.token);
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }
}