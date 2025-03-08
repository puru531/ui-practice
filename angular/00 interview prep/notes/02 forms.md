# Forms in Angular
## Working with template variables:
- Template variables are used to access form elements in the template.
- They are defined using the `#` symbol.
- Template variables can be used to access form elements in the template.
- They can be used to access the form element's properties and methods.
- Template variables can be used to access the form element's value.
- Template variables can be used to access the form element's validity, errors, and validation status.

```html
<form (ngSubmit)="submit(nameInput)">
  <input type="text" name="name" #nameInput >
  <button (click)="submit(myForm)">Submit</button>
</form>
```

```typescript
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  import: [FormsModule]
})

export class AppComponent {
  submit(nameElement: HTMLInputElement) {
    console.log(nameElement.value);
  }
}
```


## Getting access to template elements via @ViewChild:
- `@ViewChild` decorator is used to access template elements in the component.
- It is used to access the template element's properties, value, and methods.

```html
<form #myForm>
  <input type="text" name="name">
  <button (click)="submit(myForm)">Submit</button>
</form>
```

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  @ViewChild('myForm') myForm: ElementRef;

  submit() {
    console.log(this.myForm.nativeElement.value);
    myForm.nativeElement.reset();
  }
}
```

## @ViewChildren:
- `@ViewChildren` decorator is used to access multiple template elements in the component.

```html
<form #myForm>
  <input type="text" name="name">
  <input type="text" name="email">
  <button (click)="submit(myForm)">Submit</button>
</form>
```

```typescript

export class AppComponent {
  @ViewChildren('myForm') myForm: QueryList<ElementRef>;

  submit() {
    this.myForm.forEach((form) => {
      console.log(form.nativeElement.value);
      form.nativeElement.reset();
    });
  }
}
```

## ViewChild Signal function:
```typescript
export class AppComponent {
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  onSubmitted() {
    console.log(this.form().nativeElement.value);
    this.form().nativeElement.reset();
  }
}
```


## ViewChild vs ContentChild:
- `@ViewChild` is used to access template elements in the component.
- `@ContentChild` is used to access content elements in the component.

```html
<app-child>
  <form #myForm>
    <input type="text" name="name">
    <button (click)="submit(myForm)">Submit</button>
  </form>
</app-child>
```

```typescript
export class AppChildComponent {
  @ContentChild('myForm') myForm: ElementRef;

  submit() {
    console.log(this.myForm.nativeElement.value);
    myForm.nativeElement.reset();
  }
}
```