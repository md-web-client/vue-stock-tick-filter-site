# DEV Assessment

This project is a skeleton project leveraging Vue, Bulma, and Webpack (NPM for dependencies).

This project is built in ES6 syntax ([example IDE configuration](https://stackoverflow.com/questions/35425915/how-do-i-enable-es6-syntax-in-webstorm))


Dependencies : 
- npm - [Installation instructions](https://www.npmjs.com/get-npm)


```
npm install

npm run serve
```


# Your Mission
Your going to be using the [IEX Cloud API](https://iexcloud.io/docs/api/#collections) to display stock tickers and data!

### Basics

- You can use any IDE of your choice
- You must use Vue and Bulma
- You can install any other packages available in the node ecosystem to help you complete the assessment (included are some helpful libs and home brewed elements)

The base project **already includes** 
- Pulling the necessary data from the API (for the base requirements)
- A pre-built 
    - route (to the symbols page)
    - api service (to get IEX data)
    - view (to display the list of symbols)

### Requirements
Use the existing list of symbols being returned on the **Symbols** page to achieve the following :

- Clean up and display the list of symbols in a UI/UX friendly way
    - Leverage any of the available data points currently being returned by the API to achieve this

- Allow performing these actions on the list (do NOT re-fetch the data from the API):
    - **Searching** : On symbol and company name
    - **Sorting** : Ascending and descending on at least 1 data point
    - **Filtering** : Between a range of (at least) the following fields : 
        - "open"
        - "close" 


### Bonus Points
(These are not mandatory and if you choose to do any of these - please only choose one)

- Ability to click a single stock ticker and navigate to a dedicated page (has it's own route and URL) for viewing it
    - Find and use the API end point for selecting a single ticker so you can load all possible information for it
    - Display as much or as little information as you like about the ticker in question
            
- Allow **favoriting** symbols by storing them in local storage and possibly Vuex
    - Add a menu item for viewing favorite symbols

- Allow **excluding** symbols by storing them in local storage and then preventing them from displaying in your main lists component
    - Add a menu item for viewing excluded symbols


### Submission
- Add any assumptions you made, challenges you over came, or anything note-worthy that you would like to have evaluated and/or discussed. Put these assumptions in the **ASSUMPTIONS.md** file.
- Commit your changes to your own GitHub profile (or another public code repository) and send a link to the repository to the person that provided you this assessment. 
- **Provide the # of hours you invested in the assessment in your submission**


### Tips
- Effective use of white space and colors to make the data consumable
- Effective use of coloring to distinguish trends 



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
