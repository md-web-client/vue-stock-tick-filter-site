## Stock Ticker Website to teach vue to others.

This project is a skeleton project leveraging Vue, Bulma, and Webpack (NPM for dependencies).

This project is built in ES6 syntax ([example IDE configuration](https://stackoverflow.com/questions/35425915/how-do-i-enable-es6-syntax-in-webstorm))

This project was a development assignment that turned into a good vue project for teaching others.

Content added to the project:
1) Testing, https://github.com/MichaelDimmitt/vue-stock-tick-filter-website/pull/5 <br/>
The test plugin may be added by Vue CLI after the initial project creation using: `vue add @vue/unit-jest`
2) All of the lifecycle methods are demonstrated in the project.
3) Vue.register(component) registration.
4) Dynamic component routing in vue.
5) Vue Instance Variables.
6) Vue Local Storage State. - note localStorage saves your content as a string.
7) Computed Properties vs Watchers
8) Filter Search and Sort can be found [here](https://github.com/MichaelDimmitt/vue-stock-tick-filter-website/blob/master/src/lib/apiFilter.js)
9) localStorage and computed properties example can be found [here](https://github.com/MichaelDimmitt/vue-stock-tick-filter-website/blob/master/src/views/Symbols.vue)

To Be Done
1) Vuex.
2) ** Let me know if you think of more things [to do in Issues](https://github.com/MichaelDimmitt/vue-stock-tick-filter-website/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) **

## Installation/Usage:

Dependencies : 
- npm - [Installation instructions](https://www.npmjs.com/get-npm)

```bash
{
git clone https://github.com/MichaelDimmitt/vue-stock-tick-filter-website.git;
cd vue-stock-tick-filter-website;
npm install;
npm run serve;
}
```

## Project Details
[IEX Cloud API](https://iexcloud.io/docs/api/#collections) is used to display stock tickers and data!


#### Linting
Getting [lint](https://eslint.org/) errors? Fix them with:

```
npm run lint --fix
```

#### Resources
[Vue](https://vuejs.org/v2/guide/) : Vue

##### Libs
[Bulma](https://bulma.io/documentation/) : CSS framework

[Axios](https://github.com/axios/axios) : Used for making AJAX/XHR requests

[Moment](https://momentjs.com/docs/) : Date helper

[_ (underscore.js)](https://underscorejs.org/) : You should know
