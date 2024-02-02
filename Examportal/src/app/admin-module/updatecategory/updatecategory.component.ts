import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { category } from 'src/app/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryServiceService } from 'src/app/service/Adminservice/category-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css'],
})
export class UpdatecategoryComponent implements OnInit {
  updateCategoryForm!: FormGroup;
  categoryData: category[] = [];
  id: any;
  constructor(
    private service: CategoryServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.updateCategoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // action: ['', Validators.required],
    });
  }
  // category: any[] = [
  //   { title: 'Java', description: 'Programming quiz', isActive: 'Active' },
  // ];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getCategory();
  }
  get controls() {
    return this.updateCategoryForm.controls;
  }

  getCategory() {
    this.service.getById(this.id).subscribe({
      next: (data) => {
        console.log('category data', data);
        if (data) {
          this.updateCategoryForm.setValue({
            title: data.title,
            description: data.description,
          });
        }
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  updateCategory() {
    if (this.updateCategoryForm.valid) {
      this.service
        .updateCategory(this.id, this.updateCategoryForm.value)
        .subscribe({
          next: () => {
            console.log('category updated !');
            this.snack.open('Category Updated !', '', {
              duration: 1500,
              verticalPosition: 'top',
            });
            this.router.navigate(['admin/listCategory']);
          },
          error: (error) => {
            console.log('unable to update category !', error);
            this.snack.open('Unable  to update category !', '', {
              duration: 1500,
              verticalPosition: 'top',
            });
          },
        });
    } else {
      this.updateCategoryForm.markAllAsTouched();
      this.snack.open('Fill All Mandatory Fields !', '', {
        duration: 1500,
        verticalPosition: 'top',
      });
    }
  }
}
