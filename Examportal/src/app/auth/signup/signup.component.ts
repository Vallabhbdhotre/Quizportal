import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupform!: FormGroup;

  constructor(
    private signup: SignupService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.signupform = this.fb.group({
      userName: ['', [Validators.required ,Validators.minLength(4)]],
      fName: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
  get controls(){
    return this.signupform.controls;
  }
  onSubmit() {
   
    if (this.signupform.valid) {
      this.signup.signup(this.signupform.value).subscribe({
        next: (res) => {
          // console.log('success', res);
          this.snack.open('Registered Successfully...','',{duration:1500,verticalPosition:'top'});
           this.router.navigate(['auth/login'])
        },
        error: (error) => {
          console.log('error', error);
          this.snack.open('something went wrong !!','',{duration:1500,verticalPosition:'top'})

        },
      });
    } else {
      this.signupform.markAllAsTouched();
      this.snack.open('Fill all Mandatory Fields !', '', {
        duration: 1500,
        verticalPosition: 'top',
      });
    }
  }
}
