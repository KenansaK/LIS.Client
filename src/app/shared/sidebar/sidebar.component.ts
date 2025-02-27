import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  path: string;
  title: string;
  icon: string;
  module: string;
  children?: MenuItem[];
  expanded?: boolean;
}

interface Permission {
  id: number;
  module: string;
  name: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  allMenuItems: MenuItem[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', module: 'crm' },
    { path: 'crm/customers', title: 'CRM', icon: 'group', module: 'crm' },
    { 
      path: 'accounts', 
      title: 'Accounts', 
      icon: 'account_circle',
      module: 'accounts',
      expanded: false,
      children: [
        { path: 'accounts/users', title: 'Users', icon: 'person', module: 'accounts' },
        { path: 'accounts/roles', title: 'Roles', icon: 'admin_panel_settings', module: 'accounts' },
        { path: 'accounts/permissions', title: 'Permissions', icon: 'security', module: 'accounts' }
      ]
    }
  ];

  menuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.filterMenuItems();
  }

  private hasModulePermission(module: string): boolean {
    const permissionsJson = localStorage.getItem('userPermissions');
    if (!permissionsJson) return false;

    const permissions: Permission[] = JSON.parse(permissionsJson);
    return permissions.some(permission => 
      permission.module.toLowerCase() === module.toLowerCase()
    );
  }

  private filterMenuItems() {
    this.menuItems = this.allMenuItems.filter(item => {
      return this.hasModulePermission(item.module);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSubmenu(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    } else {
      this.router.navigate([item.path]);
    }
  }

  trackByPath(index: number, item: MenuItem): string {
    return item.path;
  }
} 