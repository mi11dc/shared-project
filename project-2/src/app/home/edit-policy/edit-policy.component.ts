import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Category, PolicyNameWithCategory } from "../_models/model";
import { HomeService } from "../_services/home.service";
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-edit-policy',
    templateUrl: './edit-policy.component.html',
    styleUrls: ['./edit-policy.component.scss'],
})
export class EditPolicyComponent implements OnInit {

    mode = environment.mode;
    position = 'floating';
    editPolicyForm: FormGroup;
    isFormSubmit: boolean;
    policyKey = '';
    policyObj: PolicyNameWithCategory;
    categories: Category[] = [];
    policies: PolicyNameWithCategory[] = [];

    constructor(
        private FB: FormBuilder,
        private homeService: HomeService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.getCategories();
        this.setDefaultData();
        this.getAllPolicies()
    }

    get f() {
        return this.editPolicyForm.controls;
    }

    ngOnInit() {   
    }

    setDefaultData() {
        this.isFormSubmit = false;
        this.editPolicyForm = this.FB.group({
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

    getAllPolicies() {
        this.homeService.getPolicies().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(data => {
            this.policies = data;
            this.getSelectedPolicy();
          });
    }

    getSelectedPolicy() {
        this.route.paramMap
            .pipe(switchMap(params => this.policies.filter(x => x.key === (this.policyKey = params.get('id')))))
            .subscribe((response) => {
                this.policyObj = response;
                this.editPolicyForm.controls.title.setValue(response.name);
                this.editPolicyForm.controls.description.setValue(response.description);
                this.editPolicyForm.controls.category.setValue(response.categoryObj.key);
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

        if (this.editPolicyForm.invalid) {
            return;
        }

        const policyObj = {
            name: this.f.title.value,
            description: this.f.description.value,
            categoryObj: this.categories.find(x => x.key === this.f.category.value)
        }

        this.homeService.editPolicy(this.policyKey, policyObj).snapshotChanges().pipe(
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