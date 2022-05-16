import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyNameWithCategory } from './_models/model';
import { HomeService } from './_services/home.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  policies: PolicyNameWithCategory[] = [];

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPolicies();
  }

  getPolicies() {
    this.homeService.getPolicies().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.policies = data;
    });
  }

  addPolicy() {
    this.router.navigate(['/home/add']);
  }

  editPolicy(key) {
    this.router.navigate([`/home/${key}/edit`]);
  }

  deletePolicy(key) {
    this.homeService.deletePolicy(key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
        this.policies = data;
    });
  }

  logoutUser() {
    localStorage.removeItem('res');
    this.router.navigate(['/auth/login']);
  }

}
