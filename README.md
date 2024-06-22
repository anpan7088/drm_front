# Dorms reviews - forntend

Front end is build with [ReactJS](https://react.dev/). 

[Vite](https://vitejs.dev/) is used as a bundler.

For local development, run `npm run dev`, or beter `yarn dev`

First you need to do download or fetch this gitrepo https://github.com/anpan7088/drm_front.git
or clone whith GitHub CLI: 

```
# cloning the repo
gh repo clone anpan7088/drm_front

# for instaling dependencies:
yarn

```

[Axios](https://axios-http.com/) is used for API calls, instaled with `npm i axios` or `yarn add axios`.

[react-bootstrap](https://www.npmjs.com/package/react-bootstrap) is used for styling.

[sass](https://sass-lang.com/guide/) is used for styling, and customising some bootstrup variables.

```
yarn add react-bootstrap bootstrap sass
```

For local development run:

```
yarn dev --host
```

Parametar --host is for listening on all available adresses.

For production run:
```
yarn build
```

and result will be in the `dist` folder.