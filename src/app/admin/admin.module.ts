import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TestjhipsterSharedModule} from '../shared';

import {
  adminState,
  AuditsComponent,
  UserMgmtComponent,
  UserDialogComponent,
  UserDeleteDialogComponent,
  UserMgmtDetailComponent,
  UserMgmtDialogComponent,
  UserMgmtDeleteDialogComponent,
  LogsComponent,
  JhiMetricsMonitoringModalComponent,
  JhiMetricsMonitoringComponent,
  JhiHealthModalComponent,
  JhiHealthCheckComponent,
  JhiConfigurationComponent,
  JhiDocsComponent,
  AuditsService,
  JhiConfigurationService,
  JhiHealthService,
  JhiMetricsService,
  LogsService,
  UserResolvePagingParams,
  UserResolve,
  UserModalService,
  GroupResolve,
  GroupModalService,
  GroupMgmtComponent,
  GroupDialogComponent,
  GroupDeleteDialogComponent,
  GroupMgmtDeleteDialogComponent,
  GroupMgmtDialogComponent,
  GroupResolvePagingParams
} from './';
import {GroupService} from './group-management/group.service';

@NgModule({
  imports: [
    TestjhipsterSharedModule,
    RouterModule.forRoot(adminState, {useHash: true}),
  ],
  declarations: [
    AuditsComponent,
    UserMgmtComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiConfigurationComponent,
    JhiHealthCheckComponent,
    JhiHealthModalComponent,
    JhiDocsComponent,
    JhiMetricsMonitoringComponent,
    JhiMetricsMonitoringModalComponent,
    GroupMgmtComponent,
    GroupDialogComponent,
    GroupDeleteDialogComponent,
    GroupMgmtDialogComponent,
    GroupMgmtDeleteDialogComponent,
  ],
  entryComponents: [
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    JhiHealthModalComponent,
    JhiMetricsMonitoringModalComponent,
    GroupMgmtDialogComponent,
    GroupMgmtDeleteDialogComponent,
  ],
  providers: [
    AuditsService,
    JhiConfigurationService,
    JhiHealthService,
    JhiMetricsService,
    LogsService,
    UserResolvePagingParams,
    GroupResolvePagingParams,
    UserResolve,
    UserModalService,
    GroupResolve,
    GroupModalService,
    GroupService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestjhipsterAdminModule {
}
