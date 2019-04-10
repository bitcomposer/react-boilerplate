/**
 * Scene Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const currentScenes = require('../utils/currentScenes');
const sceneComponentExists = require('../utils/sceneComponentExists');

let theSceneName = '';

module.exports = {
  description: 'Add an unconnected scene component',
  prompts: [
    {
      type: 'list',
      name: 'sceneName',
      message: 'Select the scene to generate the component for',
      default: 'Stateless Function',
      choices: () => currentScenes(),
      validate: value => {
        theSceneName = value;
        return true;
      },
    },
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      choices: () => [
        'Stateless Function',
        'React.PureComponent',
        'React.Component',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return sceneComponentExists(value, theSceneName)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './sceneComponent/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './sceneComponent/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path:
          '../../app/scenes/{{properCase sceneName}}/components/{{properCase name}}/index.js',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../../app/scenes/{{properCase sceneName}}/components/{{properCase name}}/tests/index.test.js',
        templateFile: './sceneComponent/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If they want a i18n messages file
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path:
          '../../app/scenes/{{properCase sceneName}}/components/{{properCase name}}/messages.js',
        templateFile: './sceneComponent/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If want Loadable.js to load the component asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path:
          '../../app/scenes/{{properCase sceneName}}/components/{{properCase name}}/Loadable.js',
        templateFile: './sceneComponent/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'scene-component-prettify',
    });

    return actions;
  },
};
