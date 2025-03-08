# Forms in Angular

- [Introduction](#introduction)
- [Template-driven forms](#template-driven-forms)
- [Reactive forms](#reactive-forms)

## Introduction

Forms are an essential part of any web application. Angular provides two ways to work with forms: template-driven forms and reactive forms.

## Template-driven forms

- Setting up forms via component template
- Easy to get started
- Implementing more complex logic & forms can be tricky

**Registering form controls**

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <h2>Login</h2>

  <div class="control-row">
    <div class="control no-margin">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" ngModel>
    </div>

    <div class="control no-margin">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" ngModel>
  </div>

  <button type="submit">Login</button>
</form>
```

**Getting access to Angular managed form**

```typescript
export class LoginComponent {
  onSubmit(formData: NgForm) {
    console.log(formData.form.value);
  }
}
```

**Handling form validation**

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <h2>Login</h2>

  <div class="control-row">
    <div class="control no-margin">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" ngModel required email #email="ngModel">
      <div *ngIf="email.invalid && email.touched" class="error">Invalid email</div>
    </div>

    <div class="control no-margin">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" ngModel required minlength="6" maxlength="18" pattern="[a-zA-Z0-9]+" #password="ngModel">
      <div *ngIf="password.invalid && password.touched" class="error">Invalid password</div>
    </div>

  <button type="submit">Login</button>
</form>
```

```typescript
onSubmit(formData: NgForm) {
  if (formData.form.invalid) {
    return;
  }

  console.log(formData.form.value);
}
```

## Reactive forms

- Setting up forms via component class (TS code)
- Setup requires more verbose code
- Handling more complex logic & forms can be easier

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <h2>Login</h2>

  <div class="control-row">
    <div class="control no-margin">
      <label for="email">Email</label>
      <input type="email" id="email" formControlName="email">
    </div>

    <div class="control no-margin">
      <label for="password">Password</label>
      <input type="password" id="password" formControlName="password">
  </div>

  <button type="submit">Login</button>
</form>
```

**Registering form controls**

```typescript

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // form property should match formGroup in the template
  form = mew FormGroup({ // property name should match formControlName in the template
    email: new FormControl('', {validators: [Validators.required, Validators.email]}), // initial value, validators
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern('[a-zA-Z0-9]+')]}),
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
}
```

### Building custom validators

```typescript
form = mew FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(6), Validators.maxLength(18), (control: AbstractControl) => {
      if (!control.value.match(/[a-zA-Z0-9]+/)) {
        return {invalidPassword: true};
      }

      return null;
    }]}),
  });
```

**OR**

```typescript
function invalidPassword(control: AbstractControl): {[key: string]: boolean} {
  if (!control.value.match(/[a-zA-Z0-9]+/)) {
    return {invalidPassword: true};
  }

  return null;
}
form = mew FormGroup({
  email: new FormControl('', {validators: [Validators.required, Validators.email]}),
  password: new FormControl('', {validators: [Validators.required, Validators.minLength(6), Validators.maxLength(18), invalidPassword]}),
});
```

### Creating and Using Async Validators

```typescript
function uniqueEmail(control: AbstractControl): Promise<{[key: string]: boolean} | null> {
  return timer(2000).pipe(
    map(() => {
      if (control.value === 'example@example.com') {
        return {emailTaken: true};
      }
      return null;
    })
  );
}

form = mew FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email], asyncValidators: [uniqueEmail]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(6), Validators.maxLength(18), invalidPassword]}),
  });
```
