import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { TagInterface } from '../types/tag.interface';

// Creates the test suite
describe('ApiService', () => {
  // declares variables to hold the service instance and HTTP testing controller.
  let service: ApiService;

  let httpTestingController: HttpTestingController;

  //Configures the testing module before each test:
  beforeEach(() => {
    TestBed.configureTestingModule({
      // HttpClientTestingModule: Provides a mock HTTP client instead of making real HTTP calls
      imports: [HttpClientTestingModule], // Don't directly provide HttpClient in providers array, use Testing module. HttpClientTestingModule replaces HttpClient and allows us to create mocks and response like we want inside our test.
      // ApiService: Makes the service available for injection
      providers: [ApiService], // we don't need to do any real api calls, so providing HttpClient in providers array is not needed.
    });

    //Injects the service and HTTP testing controller instances for use in tests.
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //Runs after each test to verify that no unexpected HTTP requests were made. If any requests weren't handled by the test, it will fail.
  afterEach(() => {
    // Verify that no unmatched requests are outstanding.
    // If any requests are outstanding, fail with an error message indicating which requests were not handled.

    // before writing any test we want to call verify method on HttpController, because we want to make sure that all our tests are resetted to initial state and we don't have any mocks between tests.
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(service).toBeTruthy();
  });

  // Creates a nested test suite for the getTags method and declares a variable to store the response.
  describe('getTags', () => {
    it('should return a list of tags', () => {
      let tags: TagInterface[] | undefined;

      //Calls the service method and subscribes to the Observable, storing the response in the tags variable.
      service.getTags().subscribe((response) => {
        tags = response;
      });

      //Expects exactly one HTTP request to the specified URL. This captures the request for mocking.
      // This should be called after we call HttpClient otherwise it won't work
      const req = httpTestingController.expectOne('http://localhost:3004/tags'); // mock -> for which URL you want to get response

      //Simulates the HTTP response by providing mock data. This triggers the Observable to emit.
      req.flush([{ id: '1', name: 'foo' }]); // response mock

      //Verifies that the service correctly processed the mocked response and the tags variable contains the expected data.
      expect(tags).toEqual([{ id: '1', name: 'foo' }]);
    });
    // Using waitForAsync
    /**
     * Wraps a test function in an asynchronous test zone. The test will automatically complete when all asynchronous calls within this zone are done. Can be used to wrap an inject call.
     */
    it('should return a list of tags using waitForAsync', waitForAsync(() => {
      service.getTags().subscribe((response) => {
        expect(response).toEqual([{ id: '1', name: 'foo' }]);
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush([{ id: '1', name: 'foo' }]);
    }));
  });
  describe('createTags', () => {
    it('should create a tag', () => {
      let tag: TagInterface | undefined;

      service.createTags('foo').subscribe((response) => {
        tag = response;
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush({ id: '1', name: 'foo' });

      expect(tag).toEqual({ id: '1', name: 'foo' });
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ name: 'foo' });
    });

    it('throws an error if request fails', () => {
      let actualError: HttpErrorResponse | undefined;
      service.createTags('foo').subscribe({
        next: () => {
          fail('success should not be called');
        },
        error: (err) => {
          actualError = err;
        },
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush('Server error', { status: 401, statusText: 'Unauthorized' });

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }

      expect(actualError?.status).toEqual(401);
      expect(actualError?.statusText).toEqual('Unauthorized');
    });
  });
});
