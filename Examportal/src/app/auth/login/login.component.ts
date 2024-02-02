// import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginform :FormGroup
 constructor(private loginservice:LoginService,private fb:FormBuilder ,private snack:MatSnackBar,private router:Router){
  this.loginform =this.fb.group({
    username:['',Validators.required],
    password:['' ,Validators.required]
  })
 }
 get controls(){
  return this.loginform.controls;

 }
 onSubmit(){

  if(this.loginform.valid){
    this.loginservice.login(this.loginform.value).subscribe({
      next:(res)=>{
        console.log('success',res);
        if(res){
          localStorage.setItem('userData',JSON.stringify(res))
          localStorage.setItem('token',res.token)
        }

        this.snack.open('You are logged in...','',{duration:1000,verticalPosition:'top'} )
        if(res.userName=='vallabh123' && res.phone==123456){
          

         this.router.navigate(['/admin'])
        }
        else{
          this.router.navigate(['/user/home']);
        }
       
      },
      error: (error)=>{
        console.log('error in login',error);
        if(error.status===500){
          this.snack.open('Invalid Username or Password !','',{duration:2000,verticalPosition:'top'})
        }
        else{
        this.snack.open('something went wrong !!','',{duration:1500,verticalPosition:'top'})

        }
      }
    })
  }
  else{
    this.loginform.markAllAsTouched();
    this.snack.open('Fill all Mandatory fields !','',{duration:2000,verticalPosition:'top'})
    // alert('Fill all Mandatory Fields !');
  }
 }
}
