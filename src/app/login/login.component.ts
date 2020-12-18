import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userData = [];
  username:string
  password:string
  isUserLoggedIn = new Subject<boolean>();

  constructor(private router: Router,public _dataService: DataService,public toastr:ToastrService) {
    this.isUserLoggedIn.next(false);
   }

  ngOnInit(): void {
  }

  signupFunction(){
    this.router.navigate(['/signup'])
  }


  enterAllDetails(){
    this.toastr.error('Please enter all the details','Warning',{positionClass: 'md-toast-top-left'});
    console.log("in");
  }
  loginSuccessful(){
    this.toastr.success('Logged In','Success');
  }

  loginFailure(){
    this.toastr.error('Invalid Credentials. Please enter valid credentials','Failure');
  }
  loginFunction(){
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;
    console.log(JSON.stringify(record));

    if(!this.username || !this.password){
      this.enterAllDetails();
      console.log("UserName or password is missing");
    }else{
      this._dataService.userLogin(record);
    }
  }

}
