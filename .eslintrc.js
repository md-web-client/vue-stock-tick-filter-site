//Your welcome to change any of this to suite your style
module.exports = {
    root : true,
    env : {
        node : true
    },
    'extends' : [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules : {
        'no-console' : process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger' : process.env.NODE_ENV === 'production' ? 'error' : 'off',

        //'brace-style' : ['error', '1tbs'],

        "indent" : ["error", 4, {"SwitchCase" : 1}],

        'comma-dangle' : ['error', {
            'arrays' : 'only-multiline',
            'objects' : 'only-multiline',
            'imports' : 'only-multiline',
            'exports' : 'only-multiline',
            'functions' : 'ignore',
        }],

        'key-spacing' : ['error', {
            'beforeColon' : true,
            'afterColon' : true,
        }],

        'no-trailing-spaces' : 1,

        // allow paren-less arrow functions
        'arrow-parens' : 0,
        // allow async-await
        'generator-star-spacing' : 0,

        "camelcase" : [0, {"properties" : "never"}],

        "operator-linebreak" : ["error", "before"],

        'no-unused-vars' : ['warn'],

    },
    parserOptions : {
        parser : 'babel-eslint'
    }
}
