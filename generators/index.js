/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const promptDirectory = require('inquirer-directory');

const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);

  plop.setPrompt('directory', promptDirectory);

  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
