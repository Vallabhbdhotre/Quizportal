import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

export const uGuardGuard: CanActivateFn = (route, state) => {
  const auth =inject(LoginService);
  const snack =inject(MatSnackBar)
  if(auth.islogged()){
    return true;

  }else{
    snack.open('You Need to Log In First..!','',{duration:2500, verticalPosition:'top'})
    return false;
  }

  

};
