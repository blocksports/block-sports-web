/**
 * Component Generator
 */

module.exports = {
  description: 'Add a presentation component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
  }, {
    type: 'directory',
    name: 'from',
    message: 'Where would you like to put this component?',
    basePath: './src/site'
  }],
  actions: (data) => {
    // Generate index.js, index.test.js and style.less

    const actions = [{
      type: 'add',
      path: '../src/site/{{from}}/{{properCase name}}/index.js',
      templateFile: './component/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/site/{{from}}/{{properCase name}}/index.spec.js',
      templateFile: './component/test.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: '../src/site/{{from}}/{{properCase name}}/style.less',
      templateFile: './component/style.less.hbs',
      abortOnFail: true,
    }];


    return actions;
  },
};
