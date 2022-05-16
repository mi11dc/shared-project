import { Injectable } from '@angular/core';
import { Category } from '../_models/category.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  private dbPath = '/categories';
  categoriesRef: AngularFireList<Category>;

  constructor(
    private DBfirebase: AngularFireDatabase,
  ) {
    this.categoriesRef = DBfirebase.list(this.dbPath);
  }

  getCategories(): AngularFireList<Category> {
    return this.categoriesRef;
  }

  createCategory(data: Category): AngularFireList<Category> {
    this.categoriesRef.push(data);
    return this.categoriesRef;
  }

  editCategory(key: string, data: Category): AngularFireList<Category> {
    this.categoriesRef.update(key, data);
    return this.categoriesRef;
  }

  deleteCategory(key: string): AngularFireList<Category> {
    this.categoriesRef.remove(key);
    return this.categoriesRef;
  }
}