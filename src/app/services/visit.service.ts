import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visit } from './../models/visit';
import { Injectable } from "@angular/core";
import { GLOBAL } from './global';

@Injectable()
export class VisitService {
    public url: string;
    public identity;
    public token;
    public stats;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    register(visit: Visit): Observable<any> {
        let params = JSON.stringify(visit);
        let headers = new HttpHeaders().set('Client-Service', 'frontend-client')
            .set('Auth-Key', 'testapi')
            .set('Content-Type', 'application/json')
            .set('User-ID', '1')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', '$1$Dtqyvz7/$wZSaZbfHgn0UbLlVi1HHp0')

        return this._http.post(this.url + 'Visita/create', params, { headers: headers });
    }

    logout(): Observable<any> {
        let headers = new HttpHeaders().set('Client-Service', 'frontend-client')
            .set('Auth-Key', 'testapi')
            .set('Content-Type', 'application/json')
            .set('User-ID', '1')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', '$1$Dtqyvz7/$wZSaZbfHgn0UbLlVi1HHp0')

        return this._http.post(this.url + 'Auth/logout/', { headers: headers });
    }
    signup(visit, gettoken = null): Observable<any> {
        if (gettoken != null) {
            visit.gettoken = gettoken;
        }

        let params = JSON.stringify(visit);
        let headers = new HttpHeaders().set('Client-Service', 'frontend-client')
            .set('Auth-Key', 'testapi')
            .set('Content-Type', 'application/json')

        return this._http.post(this.url + 'Auth/login', params, { headers: headers });
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    updateVisit(visit: Visit): Observable<any> {
        let params = JSON.stringify(visit);
        let header = new HttpHeaders().set('Client-Service', 'frontend-client')
            .set('Auth-Key', 'testapi')
            .set('Content-Type', 'application/json')
            .set('User-ID', '1')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', '$1$Dtqyvz7/$wZSaZbfHgn0UbLlVi1HHp0')

        return this._http.put(this.url + 'Visita/update' + visit.id, params, { headers: header });
    }

    getVisits(): Observable<any> {
        let headers = new HttpHeaders().set('Client-Service', 'frontend-client')
            .set('Auth-Key', 'testapi')
            .set('Content-Type', 'application/json')
            .set('User-ID', '1')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', '$1$Dtqyvz7/$wZSaZbfHgn0UbLlVi1HHp0')
        return this._http.get(this.url + 'Visita/', { headers: headers });
    }

    getVisit(id): Observable<any> {
        let headers = new HttpHeaders().set('Client-Service', 'frontend-client')
            .set('Auth-Key', 'testapi')
            .set('Content-Type', 'application/json')
            .set('User-ID', '1')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', '$1$Dtqyvz7/$wZSaZbfHgn0UbLlVi1HHp0')
        return this._http.get(this.url + 'user/' + id, { headers: headers });
    }

    deleteVisit(id): Observable<any> {
        let headers = new HttpHeaders().set('Client-Service', 'frontend-client')
            .set('Auth-Key', 'testapi')
            .set('Content-Type', 'application/json')
            .set('User-ID', '1')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', '$1$Dtqyvz7/$wZSaZbfHgn0UbLlVi1HHp0')

        return this._http.delete(this.url + 'delete/' + id, { headers: headers })
    }
}