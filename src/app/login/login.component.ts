import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

//import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';
import { CommonService } from '../shared/services/common.service';
import { BackendDatastoreService } from '../shared/services/backend-datastore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login_error: boolean = false;
  productName: string;

  constructor(private router: Router,
              private common: CommonService,
              private backend: BackendDatastoreService,
              private cookieService: CookieService
               ) { }

  ngOnInit() {

  	this.loginForm = new FormGroup({
   		'serverData': new FormGroup({
  			protocol: new FormControl(),
  			port: new FormControl(),
  			servername: new FormControl()
  		}),
  		'userData': new FormGroup({
  			username: new FormControl(),
  			password: new FormControl()
  		}),
  		errormessage: new FormControl()
  	});

  	this.productName = this.common.getTitle();
  	this.login_error = false;

//ToDo
  	// Set some default values
  	//===========================================
    // Should be deleted when test are done !

  	this.loginForm.setValue({
  		serverData:	{
  			protocol:	'http',
  			servername:	'mobility172-myitsbe.trybmc.com',
  			port:		'80'
  		},
  		userData: {
  			username:	'hannah_admin@calbro.com',
  			password:	'password'
  		},
  		errormessage:	''
  	});
  }

    onSubmit() {
    	console.log(this.loginForm.value);
    	const servername = this.loginForm.get('serverData.servername').value;
    	const protocol = this.loginForm.get('serverData.protocol').value;
    	const port = this.loginForm.get('serverData.port').value;
      const username = this.loginForm.get('userData.username').value;
    	const password = this.loginForm.get('userData.password').value;

    	const url = protocol + '://' + servername + ':' + port;
    	const service_url = new URL(url);

      this.common.setURL(url);

//    	let token = this.backend.getTocken(url, username, password)
      const token = this.backend.getToken(service_url, username, password)
  			.subscribe(
  				(response: string) => {
  					let jwt = response;
//  					console.log('Your token : ' + jwt);
  					this.common.setAuthenticated(true);
            this.common.setUserName(username);
            this.common.setPWD(password);
            this.login_error = false;
//            this.cookieService.set('token', jwt);
            // this.localStorage.setItem('key', jwt).subscribe(() => {
            //        console.log('Key Storage');
            //        this.localStorage.getItem('key').subscribe((key) => { console.log(key)});
            // });
            this.router.navigate(['/main']);
  				},
  				(error) => {
  					console.log('Login ',error);
            this.loginForm.controls['errormessage'].setValue(error.error);
            this.login_error = true;
  					this.common.setAuthenticated(false);
  				}
  				);


        }
}
