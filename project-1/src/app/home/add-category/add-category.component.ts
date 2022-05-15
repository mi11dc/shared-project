import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { HomeService } from "../_core/_services/home.service";
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
    
    mode = environment.mode;
    position = 'floating';
    addCategoryForm: FormGroup;
    isFormSubmit: boolean;

    constructor(
        private FB: FormBuilder,
        private homeService: HomeService,
        private router: Router
    ) {
        this.setDefaultData();
    }

    get f() {
        return this.addCategoryForm.controls;
    }

    ngOnInit() {   
    }

    setDefaultData() {
        this.isFormSubmit = false;
        this.addCategoryForm = this.FB.group({
            title: [ '',  Validators.required ],
            description: ['', Validators.required ]
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

        if (this.addCategoryForm.invalid) {
            return;
        }

        this.homeService.createCategory(this.addCategoryForm.value).snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                    ({ key: c.payload.key, ...c.payload.val() })
                )
            )
        ).subscribe(data => {
            debugger;
            console.log(data);
            this.router.navigate(['/home/']);
        });
    }
}