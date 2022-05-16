import { Injectable } from "@angular/core";
import { Category, PolicyNameWithCategory } from "../_models/model";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
    providedIn: 'root'
})
  
export class HomeService {
  
    private dbPathForCategory = '/categories';
    private dbPath = '/policies';
    policiesRef: AngularFireList<PolicyNameWithCategory>;
    categoriesRef: AngularFireList<Category>;

    constructor(
        private DBfirebase: AngularFireDatabase,
    ) {
        this.categoriesRef = DBfirebase.list(this.dbPathForCategory);
        this.policiesRef = DBfirebase.list(this.dbPath);
    }
    
    getCategories(): AngularFireList<Category> {
        return this.categoriesRef;
    }

    getPolicies(): AngularFireList<PolicyNameWithCategory> {
        return this.policiesRef;
    }

    createPolicy(data: any): AngularFireList<PolicyNameWithCategory> {
        this.policiesRef.push(data);
        return this.policiesRef;
    }
    
    editPolicy(key: string, data: any): AngularFireList<PolicyNameWithCategory> {
        this.policiesRef.update(key, data);
        return this.policiesRef;
    }
    
    deletePolicy(key: string): AngularFireList<PolicyNameWithCategory> {
        this.policiesRef.remove(key);
        return this.policiesRef;
    }
}