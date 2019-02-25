import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
//
@Component({
  selector: 'app-breadcrumbs',
  template: `
  <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
  <li class="breadcrumb-item"
  *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/'||breadcrumb.label.title&&last"
  [ngClass]="{active: last}">
  <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
  <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
  </li>
  </ng-template>`
})

export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Array<Object>;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log(this.activatedRoute.root);
    });
  }
}
