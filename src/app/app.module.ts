import './vendor.ts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { TestjhipsterSharedModule, UserRouteAccessService } from './shared';
import { TestjhipsterHomeModule } from './home/home.module';
import { TestjhipsterAdminModule } from './admin/admin.module';
import { TestjhipsterAccountModule } from './account/account.module';
import { TestjhipsterEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
  JhiMainComponent,
  LayoutRoutingModule,
  NavbarComponent,
  FooterComponent,
  ProfileService,
  PageRibbonComponent,
  ActiveMenuDirective,
  ErrorComponent
} from './layouts';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    LayoutRoutingModule,
    Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
    TestjhipsterSharedModule,
    TestjhipsterHomeModule,
    TestjhipsterAdminModule,
    TestjhipsterAccountModule,
    TestjhipsterEntityModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    AppComponent
  ],
  providers: [
    ProfileService,
    customHttpProvider(),
    PaginationConfig,
    UserRouteAccessService
  ],
  bootstrap: [ JhiMainComponent ]
})
export class TestjhipsterAppModule {}
