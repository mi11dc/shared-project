import { Injectable } from '@angular/core';
import { Category } from '../_models/category.model';
// import {
//   Firestore, addDoc, collection, collectionData,
//   doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
// } from '@angular/fire/firestore';
// import { Database } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
// import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

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