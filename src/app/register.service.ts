import { Injectable } from "@angular/core";
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RegisterService{

    constructor(private http:HttpClient){ }

    register(user:User){
        //console.log(JSON.stringify(user));
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://referral.invesmate.com/send.php",user,{headers:headers}).subscribe(res=>{
            alert("User Registered");
        })
    }
}