import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChooseComponent } from "./choose/choose.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
    {
        path: 'login',
        component: SigninComponent,
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'choose',
        component: ChooseComponent
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}