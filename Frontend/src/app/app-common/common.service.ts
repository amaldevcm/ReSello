import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    currentUser: Object;
    cart: any = [];
    token = null;
    headers: HttpHeaders;
    isLoggedIn: Boolean = false;

    user = {
        _id: null,
        name: null,
        email: null,
        mobile: null,
        address: null,
        zipcode: null,
        role: "user",
        rating: null
    }


    serverurl = "https://resello-backend.onrender.com/api/";
    constructor(private http: HttpClient) {  
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('session-token')
        });
    }

    updateUserData(data) {
        console.log('inside common',data)
        this.user = data;
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
