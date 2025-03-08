### 1. What is Cypress, and why is it used for testing in Angular?

Cypress is a modern end-to-end testing framework designed for web applications. It is commonly used in Angular projects for its fast execution, real-time debugging, and easy setup.

**Key Benefits:**

- Runs directly in the browser
- Provides automatic waiting for commands
- Allows time-travel debugging
- Supports API testing and UI interaction

---

### 2. How do you set up Cypress in an Angular project?

To set up Cypress in an Angular project:

1. Install Cypress:
   ```sh
   npm install cypress --save-dev
   ```
2. Open Cypress for the first time:
   ```sh
   npx cypress open
   ```
3. Configure Cypress by modifying `cypress.config.js`:
   ```js
   module.exports = {
     e2e: {
       baseUrl: "http://localhost:4200",
     },
   };
   ```
4. Write your first test in `cypress/e2e/sample.cy.js`:
   ```js
   describe("My First Test", () => {
     it("Visits the Angular app", () => {
       cy.visit("/");
       cy.contains("Welcome");
     });
   });
   ```
5. Run the test:
   ```sh
   npx cypress run
   ```

---

### 3. How do you write a basic end-to-end test in Cypress?

A basic Cypress test consists of the following steps:

1. **Visit a page**: Navigate to the app’s URL.
2. **Interact with elements**: Click, type, or check UI elements.
3. **Assert results**: Verify expected behavior.

**Example:**

```js
describe("Login Test", () => {
  it("should allow a user to log in", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });
});
```

---

### 4. How do you test Angular components with Cypress?

To test an Angular component:

1. **Use `cy.mount` (for component testing mode)**:

   ```js
   import { mount } from "cypress/angular";
   import { MyComponent } from "./my-component.component";

   describe("MyComponent", () => {
     it("renders correctly", () => {
       mount(MyComponent);
       cy.contains("Component Title");
     });
   });
   ```

2. **Check UI interactions**:
   ```js
   cy.get("button").click();
   cy.get(".message").should("contain", "Success");
   ```

---

### 5. How do you handle API requests in Cypress for Angular applications?

You can stub and intercept API requests using `cy.intercept`:

**Example:**

```js
describe("API Interception Test", () => {
  it("stubs API response", () => {
    cy.intercept("GET", "/api/data", { fixture: "data.json" }).as("getData");
    cy.visit("/data-page");
    cy.wait("@getData");
    cy.get(".data-item").should("have.length", 5);
  });
});
```

**Why use `cy.intercept`?**

- Controls network requests
- Simulates backend responses
- Speeds up tests by avoiding real API calls

---

### 6. How do you test authentication and authorization flows in Cypress?

For authentication testing:

- **Login via UI**:

  ```js
  cy.visit("/login");
  cy.get("#email").type("user@example.com");
  cy.get("#password").type("securepassword");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");
  ```

- **Login via API and set a session**:
  ```js
  cy.request("POST", "/api/login", {
    email: "user@example.com",
    password: "securepassword",
  }).then((response) => {
    window.localStorage.setItem("token", response.body.token);
  });
  ```
- **Protect routes with guards and test restricted pages**:
  ```js
  cy.visit("/admin");
  cy.get(".error-message").should("contain", "Access Denied");
  ```

---

### 7. How do you test route navigation in Cypress for Angular apps?

To verify navigation:

```js
describe("Navigation Test", () => {
  it("navigates to About page", () => {
    cy.visit("/");
    cy.get("nav").contains("About").click();
    cy.url().should("include", "/about");
  });
});
```

---

### 8. How do you handle flaky tests and improve test reliability in Cypress?

To reduce flakiness:

- **Use retries**:
  ```js
  it("retries fetching data", { retries: 2 }, () => {
    cy.visit("/data-page");
    cy.get(".data-item").should("have.length", 5);
  });
  ```
- **Wait for elements properly**:
  ```js
  cy.get(".loader").should("not.exist");
  cy.get(".data-item").should("be.visible");
  ```
- **Use `cy.intercept` to mock network requests**:
  ```js
  cy.intercept("/api/data", { fixture: "data.json" }).as("getData");
  cy.wait("@getData");
  ```

---

### 9. How do you run Cypress tests in Continuous Integration (CI/CD)?

To run tests in CI:

1. **Add Cypress to CI/CD script** (GitHub Actions example):
   ```yaml
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Install dependencies
           run: npm install
         - name: Run Cypress tests
           run: npx cypress run
   ```
2. **Run Cypress in headless mode**:
   ```sh
   npx cypress run --headless
   ```

---

### 10. How do you generate test reports in Cypress?

To generate reports:

1. **Install the report plugin**:
   ```sh
   npm install cypress-mochawesome-reporter --save-dev
   ```
2. **Configure `cypress.config.js`**:
   ```js
   module.exports = {
     reporter: "cypress-mochawesome-reporter",
   };
   ```
3. **Run the tests and generate reports**:
   ```sh
   npx cypress run --reporter cypress-mochawesome-reporter
   ```

This produces an HTML report summarizing test results.
