import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models'; 
import { ApiService } from './api.service'; 
import { JwtService } from './jwt.service'; 

@Injectable()
export class UserService {
    // value that changes over time. Initial value is blank from model 
    private currentUserSubject = new BehaviorSubject<User>(new User()); 
    // hide subject
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged(); 

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenicated = this.isAuthenticatedSubject.asObservable(); 

    constructor(
        private http: Http,
        private apiService: ApiService,
        private jwtService: JwtService
    ) {}

    attemptAuth(type, credentials): Observable<User> {
        let route = (type === 'login') ? '/login' : ''; 
        return this.apiService.post('/users' + route, {user: credentials})
            .map(
                data => {
                    // save user data 
                    this.setAuth(data.user);
                    return data; 
                }
            ); 
    }

    setAuth(user: User) {
        // Save JWT in local storage
        this.jwtService.saveToken(user.token);
        // Set current user data into observable 
        this.currentUserSubject.next(user);
        // Set isAuthenicated to TRUE
        this.isAuthenticatedSubject.next(true); 
    }
}