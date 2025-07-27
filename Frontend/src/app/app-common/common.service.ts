import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface User {
    _id: Object,
    name: String,
    email: String,
    mobile: Number,
    address: String,
    zipcode: Number,
    role: String,
    rating: Number
}

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    currentUser: Object;
    cart: any = [];
    token = null;
    headers: HttpHeaders;
    isLoggedIn: Boolean = false;

    // User details
    private userSubject = new BehaviorSubject<User | null>(null);
    user$ = this.userSubject.asObservable();

    // serverurl = "https://resello-backend.onrender.com/api/";
    serverurl = "http://localhost:3000/api/";

    constructor(private http: HttpClient) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.userSubject.next(JSON.parse(savedUser));
        }

        if(localStorage.getItem('session-token') !== null) {
            this.isLoggedIn = true;
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('session-token')
            });
        }
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    setUserData(data) {
        this.userSubject.next(data);
        localStorage.setItem('user', JSON.stringify(data));
    }

    getUserData() {
        return this.userSubject.getValue();
    }

    clearUser() {    
        this.userSubject.next(null);
        localStorage.removeItem('user');
    }

    get(reqPath: String) {
        if(localStorage.getItem('seesion-token') !== null){
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('session-token')
            });
        }
        return this.http.get(this.serverurl+reqPath, {headers: this.headers});
    }

    post(reqPath: String, body:any = null) {
        if(localStorage.getItem('seesion-token') !== null){
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('session-token')
            });
        }
        return this.http.post(this.serverurl+reqPath, body, {headers: this.headers})
    }

    put(reqPath: String, body:any = null) {
        if(localStorage.getItem('seesion-token') !== null){
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('session-token')
            });
        }
        return this.http.put(this.serverurl+reqPath, body, {headers: this.headers});
    }

    delete(reqPath:String, id:Number) {
        if(localStorage.getItem('seesion-token') !== null){
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('session-token')
            });
        }
        return this.http.delete(this.serverurl + reqPath+'?id='+id.toString(), {headers: this.headers});
    }
}
