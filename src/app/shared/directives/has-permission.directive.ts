import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { PermissionsService } from '../../services/permissions.service';

@Directive({
  selector: '[hasPermission]',
  standalone: false
})
export class HasPermissionDirective implements OnInit {
  @Input('hasPermission') permission!: string | string[];
  @Input('hasPermissionType') type: 'any' | 'all' = 'any';
  private isVisible = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionsService: PermissionsService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  private updateView(): void {
    let hasPermission = false;
    const permissions = Array.isArray(this.permission) ? this.permission : [this.permission];

    if (this.type === 'any') {
      hasPermission = permissions.some(p => this.permissionsService.hasPermission(p));
    } else {
      hasPermission = permissions.every(p => this.permissionsService.hasPermission(p));
    }

    if (hasPermission && !this.isVisible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isVisible = true;
    } else if (!hasPermission && this.isVisible) {
      this.viewContainer.clear();
      this.isVisible = false;
    }
  }
} 