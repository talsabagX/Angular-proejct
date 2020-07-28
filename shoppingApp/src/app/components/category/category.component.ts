import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private categortService: CategoriesService
  public category: Category[];
  constructor(categortService: CategoriesService, public router: Router) {
    this.category = []
    this.categortService = categortService

  }

  ngOnInit() {
    let observable = this.categortService.getAllCategories();
    observable.subscribe(categoriesList => {
      this.category = categoriesList;
      // console.error(this.coupons);
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error));
    });
  }


  public getAllProductsCategory(id) {
    this.router.navigate(["shopping/categories/" + id]);


  }

}