import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Category, PolicyNameWithCategory } from "../_models/model";
import { HomeService } from "../_services/home.service";
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-add-policy',
    templateUrl: './add-policy.component.html',
    styleUrls: ['./add-policy.component.scss'],
})
export class AddPolicyComponent implements OnInit {
    
    mode = environment.mode;
    position = 'floating';
    addPolicyForm: FormGroup;
    isFormSubmit: boolean;

    categories: Category[] = [];

    constructor(
        private FB: FormBuilder,
        private homeService: HomeService,
        private router: Router
    ) {
        this.getCategories();
        this.setDefaultData();
    }

    get f() {
        return this.addPolicyForm.controls;
    }

    ngOnInit() {   
    }

    setDefaultData() {
        this.isFormSubmit = false;
        this.addPolicyForm = this.FB.group({
            title: [ '',  Validators.required ],
            description: ['', Validators.required ],
            category: ['', Validators.required ]
        });
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

        if (this.addPolicyForm.invalid) {
            return;
        }

        const policyObj = {
            name: this.f.title.value,
            description: this.f.description.value,
            categoryObj: this.categories.find(x => x.key === this.f.category.value)
        }

        this.homeService.createPolicy(policyObj).snapshotChanges().pipe(
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