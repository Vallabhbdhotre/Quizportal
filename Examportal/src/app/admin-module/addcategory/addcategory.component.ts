import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/service/Adminservice/category-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css'],
})
export class AddcategoryComponent {
  addCategoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private service: CategoryServiceService,
    private location:Location
  ) {
    this.addCategoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // isActive: ['', Validators.required],
    });
  }
  get controls(){
    return this.addCategoryForm.controls;
  }
  back(){
this.location.back();    
   }
   addCategory(){
    // console.log(this.addCategoryForm.value)
    if(this.addCategoryForm.valid){
      this.service.addCategory(this.addCategoryForm.value).subscribe({
        next:(res)=>{
          console.log('category Added !',res)
          this.snack.open('Category added Successfully','',{duration:2000 ,verticalPosition:'top'}) 
          this.router.navigate(['admin/listCategory'])
        },
        error:(mes)=>{
          console.log('Error',mes);
          this.snack.open('Something Went Wrong !','',{duration:1000 ,verticalPosition:'top'})
        }
      })
    }
    else{
      this.addCategoryForm.markAllAsTouched();
      alert('Fill all mandatory fields ! ')
    }
   }

}
