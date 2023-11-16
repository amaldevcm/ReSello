import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    isAdmin: boolean = true;
    currentUser: Object;
    cart: any = [];
}