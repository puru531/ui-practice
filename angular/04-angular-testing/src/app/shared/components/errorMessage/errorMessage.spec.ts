import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './errorMessage';
import { By } from '@angular/platform-browser';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent; //Will hold the actual instance of the ErrorMessageComponent
  let fixture: ComponentFixture<ErrorMessageComponent>; //Will hold the ComponentFixture that wraps the component and provides testing utilities

  beforeEach(() => {
    //Creates a testing module configuration
    TestBed.configureTestingModule({
      //Since this is a standalone component (Angular 14+), it's imported rather than declared
      imports: [ErrorMessageComponent],
    }).compileComponents(); //Compiles the component and its template (though it's synchronous here, it can be asynchronous for external templates)

    fixture = TestBed.createComponent(ErrorMessageComponent); //Creates a ComponentFixture wrapping the ErrorMessageComponent
    component = fixture.componentInstance; //Extracts the actual component instance from the fixture
    fixture.detectChanges(); //This method manually triggers Angular's change detection cycle for the component under test.
    /**
     This triggers:
        Change detection cycle runs
        Component lifecycle hooks execute (ngOnInit, ngAfterViewInit, etc.)
        Template rendering occurs
        Data binding is processed
        DOM is updated with component data
     */
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('must render default error message', () => {
    //debugElement: Provides access to the component's DOM tree for testing
    //This is Angular's testing abstraction over the native DOM
    /**
     * .query() method
        Purpose: Searches for a single element in the component's DOM
        Returns: The first matching DebugElement or null if not found
        Alternative: .queryAll() would return an array of all matching elements

     */
    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    );

    /**
     <!-- ✅ Good for testing - stable and semantic -->
    <div data-testid="message-container">Error message</div>

    <!-- ❌ Avoid - can change with styling -->
    <div class="error-message red-text">Error message</div>

    <!-- ❌ Avoid - can change with structure -->
    <div id="error-123">Error message</div>


    // By CSS class (less stable)
    By.css('.error-message')

    // By element type (too generic)
    By.css('div')

    // By directive (for Angular directives)
    By.directive(SomeDirective)

    // By component (for child components)
    By.directive(ChildComponent)
     */

    expect(messageContainer.nativeElement.textContent).toEqual('Some error message');
  });

  it('renders custom error message', ()=>{
    component.message ="Different error message";
    fixture.detectChanges();

    const messageContainer = fixture.debugElement.query(By.css('[data-testid="message-container"]'));
    expect(messageContainer.nativeElement.textContent).toEqual('Different error message');
  })
});
