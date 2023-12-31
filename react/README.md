# React JS

## Setting up a React project

To create a new react app, run `npx create-react-app` _(This is little slow)_

Give your project name : `my-project`

Go to your project folder : `cd my-project`

Run the project : `npm run start`

## React project setup using Vite

To create a new react app with Vite, run `npm create vite@latest` or you can specify any version : `npm create vite@4`. Hit enter to intall vite package _(promped for first vite project only)_

Give project name : `my-vite-react-project`

Select JS library or framework you want to use : `React`

Select a variant : `JavaScript / TypeScript`

Go to new project folder : `cd my-vite-react-project`

Install all the packages : `npm install`

Run the project : `npm run dev`

## Configure eslint in React project

Make sure eslint extension is installed in your VS Code

```
npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
```

Open .eslint.cjs file and under rules {}, add these lines

```
"no-unused-vars": "warn",
"react/prop-types": "off", //remove this in production
```

Create a new file in root folder of project : `.eslintrc.json`

Add these lines :

```
{
  "extends": "react-app",
  "rules": {
    "react/prop-types": "off"
  }
}

```

Open `vite.config.js` file, in plugins array add eslint() :

```
plugins: [react(), eslint()],
```

## Configure auto-import in react project

Create `jsconfig.json` in project root folder with below content :

```
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES6"
  },
  "exclude": ["node_modules"]
}
```

Restart your server after saving the file.

In case, the auto-import is not giving relative path _(path starting with ./folderName )_, Open VS Code Settings and add below line in setting.json file :

```
"javascript.preferences.importModuleSpecifier": "relative",
"javascript.suggest.autoImports": true,
```
