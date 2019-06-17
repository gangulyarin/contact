import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user.model';
import { RegisterService } from './register.service';
import { NgForm } from '@angular/forms';
declare var FB: any;
declare const gapi: any;
declare var userVar:User;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user:User;

  @ViewChild("contactForm")
  contactForm:NgForm;
  //FB: any;
  constructor(private registerSvc:RegisterService){
    this.user= new User();
    this.user={
      name:"",
    phone:"",
    whatsapp:"",
    email:"",
    location:"",
    query:"my-query"
    };
  }

  register(){
    this.registerSvc.register(this.user);
  }

  loginFB(){
    FB.login((response)=>
            { 
              console.log('submitLogin',response);
              if (response.authResponse)
              {
                //login success
                //login success code here
                //redirect to home page
                var self=this;
                //console.log(this.user);
                FB.api('/me', {fields: ['first_name','last_name','email', 'location']}, function(response,userVar) {
                  //console.log(response);
                  //var user = new User();
                  self.user.name=response.first_name+" "+response.last_name;
                  self.user.email=response.email;
                  self.user.location=response.location?response.location:"";
                  //console.log(this);
                  //var userVar=Object.assign({},self.user);
                 //return user; 
                });
                console.log(this.user);
                this.register();
               }
               else
               {
               alert("Login Failed. Please Try Again")
             }
          });
  }

  ngOnInit() {

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '1078801958986012',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
       //console.log("Called");
     }(document, 'script', 'facebook-jssdk'));

     //console.log(JSON.stringify(FB));

  }

  
  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1013474159898-qbb481p3qsuur1hb4eobe2vh4jadslug.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        /*console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());*/
        //YOUR CODE HERE
        this.user.name=profile.getName();
        this.user.email=profile.getEmail();
        this.register();

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
    this.googleInit();
  } 
}
