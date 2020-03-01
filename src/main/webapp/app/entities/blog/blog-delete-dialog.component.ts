import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBlog } from 'app/shared/model/blog.model';
import { BlogService } from './blog.service';

@Component({
  templateUrl: './blog-delete-dialog.component.html'
})
export class BlogDeleteDialogComponent {
  blog?: IBlog;

  constructor(protected blogService: BlogService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.blogService.delete(id).subscribe(() => {
      this.eventManager.broadcast('blogListModification');
      this.activeModal.close();
    });
  }
}
