import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GroupModalService } from './group-modal.service';
import {Group} from '../../shared/model/group.model';
import {GroupService} from './group.service';

@Component({
  selector: 'app-group-mgmt-delete-dialog',
  templateUrl: './group-management-delete-dialog.component.html'
})
export class GroupMgmtDeleteDialogComponent {

  group: Group;

  constructor(
    private groupService: GroupService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(login) {
    this.groupService.delete(login).subscribe((response) => {
      this.eventManager.broadcast({ name: 'userListModification',
        content: 'Deleted a group'});
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'app-group-delete-dialog',
  template: ''
})
export class GroupDeleteDialogComponent implements OnInit, OnDestroy {

  modalRef: NgbModalRef;
  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private groupModalService: GroupModalService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.modalRef = this.groupModalService.open(GroupMgmtDeleteDialogComponent as Component, params['login']);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
