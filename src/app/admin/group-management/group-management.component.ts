import {Component, OnDestroy, OnInit} from '@angular/core';
import {JhiAlertService, JhiEventManager, JhiPaginationUtil} from 'ng-jhipster';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';
import {ActivatedRoute, Router} from '@angular/router';
import {ITEMS_PER_PAGE} from '../../shared/constants/pagination.constants';
import {Principal} from '../../shared/auth/principal.service';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {Group} from '../../shared/model/group.model';
import {GroupService} from './group.service';

@Component({
  selector: 'app-group-mgmt',
  templateUrl: './group-management.component.html'
})
export class GroupMgmtComponent implements OnInit, OnDestroy {

  currentAccount: any;
  groups: Group[];
  error: any;
  success: any;
  routeData: any;
  links: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    private groupService: GroupService,
    private principal: Principal,
    private alertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private paginationUtil: JhiPaginationUtil,
    private paginationConfig: PaginationConfig,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe((data) => {
      this.page = data['pagingParams'].page;
      this.previousPage = data['pagingParams'].page;
      this.reverse = data['pagingParams'].ascending;
      this.predicate = data['pagingParams'].predicate;
    });
  }

  ngOnInit() {
    this.principal.identity().then((account) => {
      this.currentAccount = account;
      this.loadAll();
      this.registerChangeInUsers();
    });
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  registerChangeInUsers() {
    this.eventManager.subscribe('userListModification', (response) => this.loadAll());
  }

  loadAll() {
    this.groupService.query({
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()}).subscribe(
      (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
      (res: ResponseWrapper) => this.onError(res.json)
    );
  }

  trackIdentity(index, item: Group) {
    return item.id;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/group-management'], {
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  private onSuccess(data, headers) {
    // this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.groups = data;
  }

  private onError(error) {
    this.alertService.error(error.error, error.message, null);
  }
}
