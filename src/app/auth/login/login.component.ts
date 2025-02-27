import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { PermissionsService } from '../../services/permissions.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private usersService: UsersService,
    private router: Router, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private permissionsService: PermissionsService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[A-Z]/),  // At least one uppercase letter
        Validators.pattern(/[a-z]/),  // At least one lowercase letter
        Validators.pattern(/[0-9]/)   // At least one digit
      ]]
    });
  }

  
  login(): void {
    
    console.log('Login attempt with:', this.loginForm.value); // Debug log

    this.authService.login(this.loginForm.value).subscribe({
      
      next: (response) => {
        console.log('Login Response:', response);
        
        
        if (response.isSuccessful && response.accessToken) {
          // Save token
          this.authService.saveToken(response.accessToken);

          // Get userId from token
          const tokenPayload = JSON.parse(atob(response.accessToken.split('.')[1]));
          const userId = tokenPayload.sub;

          // Get user details to get roleId
          this.usersService.getUserById(Number(userId)).subscribe({
            next: (userResponse) => {
              if (userResponse.isSuccess) {
                const roleId = userResponse.data.roleId;
                console.log('User roleId:', roleId);
                
                // Now get permissions using roleId
                this.permissionsService.getRolePermissionsWithAll(roleId).subscribe({
                  next: (permResponse) => {
                    if (permResponse.isSuccess) {
                      const grantedPermissions = permResponse.data.permissions
                        .filter(p => p.isGranted)
                        .map(p => ({ 
                          id: p.id, 
                          name: p.name, 
                          module: p.module 
                        }));
                      
                      console.log('Granted permissions:', grantedPermissions);
                      localStorage.setItem('userPermissions', JSON.stringify(grantedPermissions));
                      
                      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
                      this.router.navigate([returnUrl]);
                    }
                  },
                  error: (err) => console.error('Error loading permissions:', err)
                });
              }
            },
            error: (err) => console.error('Error loading user details:', err)
          });
        } else {
          console.error('Login failed:', response.message);
        }
      },
      error: (err) => {
        console.error('Login Error:', err);
      }
    });
  }
}
