import { VisitService } from './../services/visit.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Visit } from '../models/visit';
import { UploadService } from './../services/upload.services';
import { GLOBAL } from '../services/global';


@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [VisitService, UploadService]
})

export class UserEditComponent implements OnInit{
    public title: string;
    public visit:Visit;
    public identity;
    public token;
    public status: string;
    public url: string;
    
    constructor(
        private _rote: ActivatedRoute,
        private _roter: Router,
        private _visitService: VisitService,
        private _uploadService: UploadService
    ){
        this.title = 'Actualizar vistas';
        this.identity = this.visit;
        this.token = this._visitService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log(this.visit);   
        console.log('user-edit.component se ha cargado...');
    }

    onSubmit(){
        console.log(this.visit);
        this._visitService.updateVisit(this.visit).subscribe(
            response =>{
                if(!response.visit){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.visit));
                    this.identity =this.visit;

                }
            },
            error =>{
                var errorMessage = <any>error;
                console.log(errorMessage);
                
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        )}
    
    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
        
    }
}


