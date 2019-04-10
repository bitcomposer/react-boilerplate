/**
 * Scene Generator
 */

const sceneExists = require('../utils/sceneExists');

module.exports = {
  description: 'Add a scene',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the base component type:',
      default: 'Stateless Function',
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
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return sceneExists(value)
            ? 'A scene with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this scene?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this scene use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var sceneTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case 'Stateless Function': {
        sceneTemplate = './scene/stateless.js.hbs';
        break;
      }
      default: {
        sceneTemplate = './scene/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/index.js',
        templateFile: sceneTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/tests/index.test.js',
        templateFile: './scene/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If scene wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/messages.js',
        templateFile: './scene/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/actions.js',
        templateFile: './scene/actions.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/tests/actions.test.js',
        templateFile: './scene/actions.test.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/constants.js',
        templateFile: './scene/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/selectors.js',
        templateFile: './scene/selectors.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/tests/selectors.test.js',
        templateFile: './scene/selectors.test.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/reducer.js',
        templateFile: './scene/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/tests/reducer.test.js',
        templateFile: './scene/reducer.test.js.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/saga.js',
        templateFile: './scene/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/tests/saga.test.js',
        templateFile: './scene/saga.test.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/scenes/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/scenes/',
    });

    return actions;
  },
};
