import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    isAdmin: boolean = true;
    currentUser: Object;
    cart: any = [];

    serverurl = "http://localhost:3000/api/";
    constructor(private http: HttpClient) {

    }

    get(reqPath: String) {
        return this.http.get(this.serverurl+reqPath);
    }

    post(reqPath: String, body:any = null) {
        return this.http.post(this.serverurl+reqPath, body)
    }

    put(reqPath: String, body:any = null) {
        return this.http.put(this.serverurl+reqPath, body);
    }

    delete(reqPath:String, id:Number) {
        return this.http.delete(this.serverurl + reqPath+'?id='+id.toString());
    }
}