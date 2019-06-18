import { Injectable } from "@angular/core";
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RegisterService{

    constructor(private http:HttpClient){ }

    register(user:User):string{
        //console.log(JSON.stringify(user));
        let ret="Success";
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.http.post("send.php",user,{headers:headers}).subscribe(res=>{
            //alert("Thank you. Our Support Team will call you soon.");
            ret = "Success";
        },error=>{
            ret = "Failed";
        });
        return ret;
    }
}