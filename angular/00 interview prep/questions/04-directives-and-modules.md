# Angular Directives and Modules Interview Questions

## 1. What are the different types of directives in Angular?
- Component Directives (with template)
- Structural Directives (*ngIf, *ngFor)
- Attribute Directives (ngStyle, ngClass)

## 2. How do you create a custom structural directive?
```typescript
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

## 3. What is the difference between NgModule and Standalone Components?
```typescript
// Traditional NgModule
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule],
  exports: [MyComponent]
})
export class MyModule {}

// Standalone Component
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-standalone'
})
export class StandaloneComponent {}
```

## 4. How do you share directives between modules?
```typescript
// Shared Module
@NgModule({
  declarations: [SharedDirective],
  exports: [SharedDirective]
})
export class SharedModule {}

// Feature Module
@NgModule({
  imports: [SharedModule]
})
export class FeatureModule {}
```

## 5. What are attribute directives and how do you create one?
```typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'yellow');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

## 6. How do directive factories work?
```typescript
export function DirectiveFactory(config: any) {
  return {
    provide: MY_DIRECTIVE,
    useFactory: () => {
      return new MyDirective(config);
    }
  };
}
```

## 7. What is the purpose of forRoot() and forChild()?
```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes)]  // Root configuration
})
export class AppModule {}

@NgModule({
  imports: [RouterModule.forChild(routes)]  // Feature module routes
})
export class FeatureModule {}
```

## 8. How do you handle module lazy loading?
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];
```

## 9. What is the difference between declarations, imports, and exports?
```typescript
@NgModule({
  declarations: [  // Components, directives, pipes
    MyComponent
  ],
  imports: [  // Other modules
    CommonModule
  ],
  exports: [  // Public API
    MyComponent
  ]
})
```

## 10. How do you optimize module loading?
- Lazy loading
- Preloading strategies
- Module bundling
- Tree shaking
- Shared modules

## 11. What are dynamic directives?
```typescript
@Directive({
  selector: '[appDynamic]'
})
export class DynamicDirective {
  @Input() set config(value: any) {
    // Dynamically update directive behavior
  }
}
```

## 12. How do you test directives?
```typescript
describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, HighlightDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });
});
```

## 13. What is the role of CoreModule?
```typescript
@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [
    {provide: APP_CONFIG, useValue: config}
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
```

## 14. How do you share state between directives?
```typescript
@Injectable()
export class DirectiveStateService {
  private state = new BehaviorSubject<any>(null);
  state$ = this.state.asObservable();
}
```

## 15. What are the best practices for module organization?
- Feature modules
- Shared modules
- Core module
- Routing modules
- Widget modules

## 16. Tricky: What happens when multiple directives target the same element?
```typescript
// Priority and execution order
<div 
  *ngIf="show" 
  [ngClass]="{'active': isActive}"
  appCustom
>
  Content
</div>
```

## 17. How do you handle circular module dependencies?
- Use forwardRef
- Restructure modules
- Use shared services
- Use events

## 18. What are standalone directives and how to use them?
```typescript
@Directive({
  standalone: true,
  selector: '[appStandalone]'
})
export class StandaloneDirective {
  // Implementation
}
```

## 19. How do you implement module preloading strategies?
```typescript
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ]
})
export class AppModule {}
```

## 20. How do you debug directive issues?
- Browser DevTools
- Angular DevTools
- Console logging
- Debugger statements
- Unit tests