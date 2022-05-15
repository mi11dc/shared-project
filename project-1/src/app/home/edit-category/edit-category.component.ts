import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Category } from "../_core/_models/category.model";
import { HomeService } from "../_core/_services/home.service";
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {

    mode = environment.mode;
    position = 'floating';
    editCategoryForm: FormGroup;
    isFormSubmit: boolean;
    categoryKey = "";
    categoryTitle = "";
    categoryDescription = "";
    categories: Category[] = [];

    constructor(
        private FB: FormBuilder,
        private homeService: HomeService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.setDefaultData();
        this.getAllCategories();
    }

    get f() {
        return this.editCategoryForm.controls;
    }

    ngOnInit() {   
    }

    setDefaultData() {
        this.isFormSubmit = false;
        this.editCategoryForm = this.FB.group({
            title: [ '',  Validators.required ],
            description: ['', Validators.required ]
        }); 
    }

    getAllCategories() {
        this.homeService.getCategories().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
        ).subscribe(data => {
            this.categories = data;
            this.getSelectedCategory();
        });
    }

    getSelectedCategory() {
        this.route.paramMap
            .pipe(switchMap(params => this.categories.filter(x => x.key === (this.categoryKey = params.get('id')))))
            .subscribe((response) => {
                this.categoryTitle = response.title;
                this.categoryDescription = response.description;
                this.editCategoryForm.controls.title.setValue(response.title);
                this.editCategoryForm.controls.description.setValue(response.description);
            });
    }

    setEmitData(data, type) {
        switch(type.toString().toLowerCase()) {
            case 'title':
                this.f.title.setValue(data);
                break;
            case 'description':
                this.f.description.setValue(data);
                break;
            default:
                break;
        }
    }

    submitForm() {
        this.isFormSubmit = true;

        if (this.editCategoryForm.invalid) {
            return;
        }

        this.homeService.editCategory(this.categoryKey, this.editCategoryForm.value).snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                    ({ key: c.payload.key, ...c.payload.val() })
                )
            )
        ).subscribe(data => {
            this.router.navigate(['/home/']);
        });
    }
}