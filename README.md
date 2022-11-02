# Tree Shaking Problem

> This repo reproduces a tree shaking problem with angular apps and nx.

The monorepo has one angular app (`MyApp`) and one angular library (`MyLibrary`). 

`MyLibrary` contains an `MyLibraryModule` that declares and exports `MyComponentComponent`.

```typescript
@NgModule({
  imports: [CommonModule],
  declarations: [MyComponentComponent],
  exports: [MyComponentComponent],
})
export class MyLibraryModule {}
```

It is imported in `MyApp` `app.module.ts` file.
```typescript
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, MyLibraryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

`MyLibrary` also exports some "`stub`" `testing` files that can be used by apps/libraries consumers for unit testing. Those files import some `@testing-library/angular` files in them.

>⚠️ Currently those files are not imported anywhere.

# Problem

After building the app with `npx nx build my-app --configuration=production` we get a couple of warnings after build:

```
Warning: /Users/saninn/dev/temp/tree-shaking/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js depends on 'aria-query'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

Warning: /Users/saninn/dev/temp/tree-shaking/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.js depends on 'pretty-format'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
```

and in the generated `main.*.js` file, `testing-library` is being included, even when we have configured our app with `"optimization": true,`.
