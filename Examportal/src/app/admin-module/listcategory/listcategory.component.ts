import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { category } from 'src/app/interface';
import { CategoryServiceService } from 'src/app/service/Adminservice/category-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css'],
})
export class ListcategoryComponent implements OnInit {
  constructor(
    private service: CategoryServiceService,
    private router: Router,
    private snack: MatSnackBar,
    private location:Location
  ) {}
  categoryData: category[] = [];
  categoryList: any[] = [];
  page: any = 0;
  size: any = 10;

  ngOnInit() {
    this.getCategoryPageble();
  }
  getCategoryPageble() {
    return this.service.getAllPageble(this.page, this.size).subscribe({
      next: (res) => {
        if (res) {
          this.categoryList = res.content;
        }
      },
      error: (error) => {
        console.log('cant get category pageble !', error);
      },
    });
  }
  addcategory() {
    this.router.navigate(['admin/addCategory']);
  }
  back() {
    this.location.back();
  }

  view(id: any) {
    this.router.navigate(['admin/viewCategory', id]);
  }

  updateCategory(id: any) {
    this.router.navigate(['admin/updateCategory', id]);
  }
  onPageChange(event: any) {
    this.page = event;
    this.getCategoryPageble();
    console.log(event);
  }
}
