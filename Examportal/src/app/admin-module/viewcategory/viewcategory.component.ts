import { Component ,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CategoryServiceService } from 'src/app/service/Adminservice/category-service.service';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})

export class ViewcategoryComponent implements OnInit {
  id:any;
  category:any[]=[]
  constructor(private  route :ActivatedRoute ,private service :CategoryServiceService){}

  ngOnInit() {
  this.id = this.route.snapshot.paramMap.get('id');
  console.log(this.id);
  this.getdata();

  
  }
  getdata(){
    this.service.getById(this.id).subscribe({
      next:(data)=>{
        console.log('Category data' ,data);
        this.category=data
        
      },
      error:(error)=>{
        console.log('unable to get by id',error);
      }
    })
    
  }
}
