import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[A-Z]/),  // At least one uppercase letter
        Validators.pattern(/[a-z]/),  // At least one lowercase letter
        Validators.pattern(/[0-9]/)   // At least one digit
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10,15}$/) // Accepts phone numbers between 10 and 15 digits
      ]],
    });
  }

  signUp(): void {
    if (this.signUpForm.valid) { // Always check if the form is valid before submitting
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: () => this.router.navigate(['/login']), // Navigate to login after successful signup
        error: (err) => console.error(err) // Log the error if the signup fails
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
