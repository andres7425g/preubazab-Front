import { Component, OnInit } from "@angular/core";
import { Visit } from './../../models/visit';
import { VisitService } from './../../services/visit.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [VisitService]
})

export class RegisterComponent implements OnInit {
    public title: string;
    public visit: Visit;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _visitService: VisitService
    ) {
        this.title = 'Registrar visita'
        this.visit = new Visit(
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
        )
    }
    ngOnInit() {
        console.log('Componente de register cargado...');
    }
    onSubmit(form) {
        console.log(this.visit);
        this._visitService.register(this.visit).subscribe(
            response => {
                if (response.visit && response.visit.id) {
                    this.status = 'success';
                    form.reset()
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);

            }
        );
    }
}