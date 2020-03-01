import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBlog, Blog } from 'app/shared/model/blog.model';
import { BlogService } from './blog.service';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogUpdateComponent } from './blog-update.component';

@Injectable({ providedIn: 'root' })
export class BlogResolve implements Resolve<IBlog> {
  constructor(private service: BlogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBlog> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((blog: HttpResponse<Blog>) => {
          if (blog.body) {
            return of(blog.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Blog());
  }
}

export const blogRoute: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.blog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BlogDetailComponent,
    resolve: {
      blog: BlogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.blog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BlogUpdateComponent,
    resolve: {
      blog: BlogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.blog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BlogUpdateComponent,
    resolve: {
      blog: BlogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.blog.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
