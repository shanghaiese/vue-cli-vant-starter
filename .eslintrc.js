module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true,
    es6: true
  },
  parser: "vue-eslint-parser",

  // 'extends': [
  //   'plugin:vue/essential',
  //   '@vue/standard'
  // ],
  rules: {
    'generator-star-spacing': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": "off",
    "no-unreachable": "off",
    "indent": "off",
    "no-extra-semi": "off",
    "no-useless-computed-key": "off",
    "no-redeclare": "warn",
    "eslint.autoFixOnSave":false
  },
  parserOptions: {
    "ecmaVersion": 7,
    "sourceType": "module",
    "parser": "babel-eslint"
  }
}
