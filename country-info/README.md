# country-info

Country-Info is a Vue.js project created with Vite and TS, 
that allows users to 
receive list of all available countries from API. Besides, each country of the list is a link itself, 
that directs to page with details. Moreover, there is a search input and random countries widget.

## Project Architecture

Components: HomeComponent, RandomCountriesWidget, SingleCountry

Views: HomeView

Vue Router: Official router for Vue.js for navigation between views

Additional Libraries: TailwindCSS for styling

## Prerequisites
Before you begin, ensure you have met the following requirements:

You have installed Node.js and npm.

You have a basic understanding of Vue.js.

## Project Setup

Clone the repository:

```sh
git clone https://github.com/senior-cherry/country-info
cd country-info
```
Install dependencies: Use npm:

```sh
npm install
```

Set up environment variables: 
Create a .env file in the root of your project 
and add necessary environment variables (VITE_API_URL).

VITE_API_URL=https://date.nager.at

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
