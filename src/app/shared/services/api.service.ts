import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http'; 
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const conduit_api = `https://conduit.productionready.io/api`; 

@Injectable()
export class ApiService { 
    constructor(
        private http: Http
    ) {}

    private setHeaders(): Headers {
        let headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        return new Headers(headersConfig); 
    }

    private formatErrors(errors: any) {
        return Observable.throw(errors.json());
    }


    // constructor({method, headers, body, url, search, withCredentials,
    //    responseType}?: RequestOptionsArgs)

    get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
        return this.http.get(`${conduit_api}${path}`, { headers: this.setHeaders(), search: params })
        .catch(this.formatErrors)
        .map((res:Response) => res.json());
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post( `${conduit_api}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
        .catch(this.formatErrors)
        .map((res:Response) => res.json()); 
    }

}