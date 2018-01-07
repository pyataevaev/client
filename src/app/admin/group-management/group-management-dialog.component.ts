import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import {Group} from '../../shared/model/group.model';
import {GroupService} from './group.service';
import {GroupModalService} from './group-modal.service';

@Component({
  selector: 'app-group-mgmt-dialog',
  templateUrl: './group-management-dialog.component.html'
})
export class GroupMgmtDialogComponent implements OnInit {

  group: Group;
  languages: any[];
  authorities: any[];
  isSaving: Boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private groupService: GroupService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.authorities = [];
    this.groupService.authorities().subscribe((authorities) => {
      this.authorities = authorities;
    });
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    if (this.group.id !== null) {
      this.groupService.update(this.group).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
    } else {
      this.groupService.create(this.group).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
    }
  }

  private onSaveSuccess(result) {
    this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
    this.isSaving = false;
    this.activeModal.dismiss(result);
  }

  private onSaveError() {
    this.isSaving = false;
  }
}

@Component({
  selector: 'app-group-dialog',
  template: ''
})
export class GroupDialogComponent implements OnInit, OnDestroy {

  modalRef: NgbModalRef;
  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private groupModalService: GroupModalService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      if ( params['id'] ) {
        this.modalRef = this.groupModalService.open(GroupMgmtDialogComponent as Component, params['id']);
      } else {
        this.modalRef = this.groupModalService.open(GroupMgmtDialogComponent as Component);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
