# CalorieBasic

This the repo for caloriebasic.com

### Apps and Packages

- `api`: calorie basic lambda express api
- `web`: vue spa web app

### Build

To build all apps and packages, run the following command:

```
cd caloriebasic
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd caloriebasic
npm run dev
```

### Remote Caching

Turborepo [Remote Caching](https://turborepo.org/docs/features/remote-caching) enabling  build cache for team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching:

```
cd caloriebasic
npx turbo login
npx turbo link
```
