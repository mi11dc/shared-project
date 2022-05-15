import { Component, OnInit } from '@angular/core';
import { Category } from './_core/_models/category.model';
import { HomeService } from './_core/_services/home.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categories: Category[] = [];

  constructor(
    private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.homeService.getCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.categories = data;
    });
  }

  addCategory() {
    this.router.navigate(['/home/add']);
  }

  editCategory(key) {
    this.router.navigate([`/home/${key}/edit`]);
  }

  deleteCategory(key) {
    this.homeService.deleteCategory(key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
        this.categories = data;
    });
  }

  logoutUser() {
    localStorage.removeItem('res');
    this.router.navigate(['/auth/login']);
  }

}
