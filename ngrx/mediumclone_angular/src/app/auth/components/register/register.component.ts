import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.inteface';
import { CommonModule } from '@angular/common';
import { selectIsSubmitting } from '../../store/reducers';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  isSubmitting$ = this.store.select(selectIsSubmitting);

  constructor(
    private fb: FormBuilder,
    private store: Store // private authService: AuthService
  ) {}

  onSubmit() {
    console.log('form : ', this.form.getRawValue());
    const request: RegisterRequestInterface = { user: this.form.getRawValue() };
    this.store.dispatch(authActions.register({ request }));
    // this.authService.register(request).subscribe((res) => console.log(res));
  }
}
