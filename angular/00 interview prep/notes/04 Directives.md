# Directives 
Directives are `enhancements` to HTML. They are instructions in the DOM that tell AngularJS's HTML compiler to `attach` a specified behavior to a `specified DOM element` or even `transform` the DOM element and its children.

Directives have no template. They are `instructions` to the HTML compiler.

## 1. Built-in Directives 
AngularJS comes with a set of built-in directives that can be used to create custom HTML tags that serve as new, custom widgets. Examples include `ngModel`, `ngRepeat`, `ngShow`, `ngHide`, `ngClick`, etc.

```html
<input type="text" ngModel="name" />
```
## 2. Attribute Directives
Attribute directives are used to change the appearance or behavior of an element, component, or another directive. They are generally used as `attributes` of HTML elements. Examples include `ngModel`, `ngClass`, `ngStyle`, `ngShow`, `ngHide`, etc.

```html
<div ngShow="isVisible">Hello World</div>
```

## 3. Structural Directives
Structural directives are used to change the structure of the DOM by adding or removing elements. Examples include `ngIf`, `ngFor`, `ngSwitch`, etc.

```html
<div *ngIf="isVisible">Hello World</div>
<!-- with else -->
<div *ngIf="isVisible; else elseBlock">Hello World</div>
<ng-template #elseBlock>Goodbye World</ng-template>
```

## 3. Custom Directives
Custom directives are used to create new HTML elements, attributes, classes, or comments that serve as new, custom widgets. They are defined by the developer. 

Through terminal, a Directive can be generated using the following command:
```bash
ng generate directive <directive-name>
# OR
ng g d <directive-name>
```
### Custom Attribute Directive


`safe-link.directive.ts`
```typescript
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  constructor() {
    console.log('Directive created');
  }

  onConfirmLeavePage(event: MOuseEvent) {
    const wantsToLeave = window.confirm('Are you sure you want to leave this page?');
    if (!wantsToLeave) {
      event.preventDefault();
    }

  }
}
```

<br /> 
<br /> 

`app.component.html`
```html
<a href="https://www.google.com" appSafeLink queryParam="my-new-app" >Google</a>
```


#### Accepting input in Directive
```typescript
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  // taking input
  queryParam = input('myApp');
  constructor() {
    console.log('Directive created');
  }

  onConfirmLeavePage(event: MOuseEvent) {
    const wantsToLeave = window.confirm('Are you sure you want to leave this page?');
    if (wantsToLeave) {
      const address = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}
```

# Directives and Dependency Injection

```typescript
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myApp');
  // inject the host element
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef)

  constructor() {
    console.log('Directive created');
  }

  onConfirmLeavePage(event: MOuseEvent) {
    const wantsToLeave = window.confirm('Are you sure you want to leave this page?');
    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}
```

### Custom Structural Directive
`app.component.html`
```html
<!-- * is not needed when using ng-template -->
 <!-- * is just a syntactic sugar which Angular uses by add ng-template if * is used -->
<ng-template appAuth="admin">
  <p>Only Admins should see this!</p>
</ng-template>
```

`auth.directive.ts`
```typescript
@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  userType = input.required({alias: 'appAuth'});

  private authService = inject(AuthService);

// you tell angular that this directive will be used on a ng-template
  private templateRef = inject<TemplateRef>(TemplateRef); // gives access to the content of the template.
  private viewContainerRef = inject<ViewContainerRef>(ViewContainerRef); // access to place in DOM where the template is used.

  constructor(
  ) {
    effect(()=> {
      if(this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef); // createEmbeddedView used to tell Angular to render some new content into a certain place in the DOM.
      } else {
        this.viewContainerRef.clear(); // clear the view container
      }
    })
  }

  ngOnInit() {
  }
}
```

### Structural Directive & Syntactic sugar
```html
<!-- * will automatically add ng-template and setup the property binding -->
<p *appAuth="'admin'">Only Admins should see this!</p>
```