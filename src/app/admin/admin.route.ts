import {Routes} from '@angular/router';

import {
  auditsRoute,
  configurationRoute,
  docsRoute,
  healthRoute,
  logsRoute,
  metricsRoute,
  userMgmtRoute,
  userDialogRoute,
} from './';

import {UserRouteAccessService} from '../shared';
import {GroupRouteAccessService} from '../shared/auth/group-route-access.service';
import {groupDialogRoute, groupMgmtRoute} from './group-management/group-management.route';

const ADMIN_ROUTES = [
  auditsRoute,
  configurationRoute,
  docsRoute,
  healthRoute,
  logsRoute,
  ...userMgmtRoute,
  metricsRoute,
  ...groupMgmtRoute,
];

export const adminState: Routes = [{
  path: '',
  data: {
    authorities: ['ROLE_ADMIN']
  },
  canActivate: [UserRouteAccessService, GroupRouteAccessService],
  children: ADMIN_ROUTES
},
  ...userDialogRoute,
  ...groupDialogRoute
];
