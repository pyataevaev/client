import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { JhiPaginationUtil } from 'ng-jhipster';

import { GroupMgmtComponent } from './group-management.component';
import { GroupDialogComponent } from './group-management-dialog.component';
import { GroupDeleteDialogComponent } from './group-management-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class GroupResolve implements CanActivate {

  constructor(private principal: Principal) { }

  canActivate() {
    return this.principal.identity().then((account) => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
  }
}

@Injectable()
export class GroupResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: JhiPaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
    const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
    return {
      page: this.paginationUtil.parsePage(page),
      predicate: this.paginationUtil.parsePredicate(sort),
      ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const groupMgmtRoute: Routes = [
  {
    path: 'group-management',
    component: GroupMgmtComponent,
    resolve: {
      'pagingParams': GroupResolvePagingParams
    },
    data: {
      pageTitle: 'groupManagement.home.title'
    }
  }
];

export const groupDialogRoute: Routes = [
  {
    path: 'group-management-new',
    component: GroupDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'group-management/:id/edit',
    component: GroupDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'group-management/:id/delete',
    component: GroupDeleteDialogComponent,
    outlet: 'popup'
  }
];
