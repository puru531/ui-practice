# AngularTesting

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---

---

# Setting up Jest inside Angular

Karma is deprecated and does not accept any new feature.

In Angular v16 & v17, Jest is in Developer preview and not stable yet.

To install Jest:

```bash
npm i jest jest-preset-angular @types/jest -D

# for this project:
npm i jest@29 jest-preset-angular@13 @types/jest@29 -D
```

`package.json`:

```json
"test": "jest",
"test:watch": "jest --watch", // run win watch mode
"test:ci": "jest --runInBand" // won't run tests in parallel but just one by one to make it safe with CI and make sure that our test don't break in CI environment.
```

create `jest.config.js` in root folder of the project:

```js
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
};
```

create `setup-jest.ts` in root folder of the project:

```ts
import "jest-preset-angular/setup-jest";
```

Update `tsconfig.spec.json` to recognise jest in spec files.

```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      // "jasmine"
      "jest" // <--- replace with jasmine
    ]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

To run the test, just run `npm test` or `npm run test:watch` or `npm run test:watch some-filename.spec.ts` to run in watch mode.

---

---

---

---

# e2e testing
To install:
```zsh
npx -p @angular/cli@17 ng add @cypress/schematic
```