import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username:string;
  password:string;
  repassword:string;
  email:string

  public userData = [];


  constructor(private http:HttpClient,private router:Router,public _dataService: DataService, private toastr: ToastrService,private notifyService : NotificationService) { }



  ngOnInit(): void {
  }




  duplicateUserName(){
    this.toastr.warning('User with this name already exists. Please proceed to login page!!');
  }

  incompleteDetails(){
    this.toastr.error('Please enter all the fields','Warning');
  }


  loginFunction(){
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;
    record['email'] = this.email;
    record['repassword'] = this.repassword;
    console.log(this.userData);
    for(let i=0;i<this.userData.length;i++){
      if(this.userData[i].username == this.username){
        console.log("There exists a user with same username");
        this.toastr.warning('User with this name already exixts. Please proceed to login page!!');
        return;
      }
    }

    this.registrationProcess();
  }
  registrationProcess(){
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;
    record['email'] = this.email;
    record['repassword'] = this.repassword;
    console.log(JSON.stringify(record));
      if(!this.username || !this.password || !this.email || !this.repassword){
        this.toastr.error('Please enter all the fields','Warning');
        this.incompleteDetails();
        return;
      }else{
        console.log("In else")
      this._dataService.userSignUp(record)
        .subscribe(res =>{
          this.username = "";
          this.password = "";
          this.email = "";
          this.router.navigate(['/login']);
        },
        err =>{
          console.log("Validation failed");

        })
    }
  }
}
