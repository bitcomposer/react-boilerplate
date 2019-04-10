/**
 * Scene Generator
 */
const currentScenes = require('../utils/currentScenes')
const subSceneExists = require('../utils/subSceneExists')

let theSceneName = ''

module.exports = {
  description: 'Add a scene',
  prompts: [
    {
      type: 'list',
      name: 'sceneName',
      message: 'Select the scene to generate the component for',
      default: 'Stateless Function',
      choices: () => currentScenes(),
      validate: value => {
        theSceneName = value
        return true
      }
    },
    {
      type: 'list',
      name: 'type',
      message: 'Select the base component type:',
      default: 'Stateless Function',
      choices: () => [
        'Stateless Function',
        'React.PureComponent',
        'React.Component'
      ]
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return subSceneExists(value, theSceneName)
            ? 'A sub scene with this name already exists'
            : true
        }

        return 'The name is required'
      }
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?'
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this scene?'
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)'
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?'
    }
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var sceneTemplate // eslint-disable-line no-var

    switch (data.type) {
      case 'Stateless Function': {
        sceneTemplate = './subScene/stateless.js.hbs'
        break
      }
      default: {
        sceneTemplate = './subScene/class.js.hbs'
      }
    }

    const actions = [
      {
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/index.js',
        templateFile: sceneTemplate,
        abortOnFail: true
      },
      {
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/tests/index.test.js',
        templateFile: './subScene/test.js.hbs',
        abortOnFail: true
      }
    ]

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/actions.js',
        templateFile: './subScene/actions.js.hbs',
        abortOnFail: true
      })
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/tests/actions.test.js',
        templateFile: './subScene/actions.test.js.hbs',
        abortOnFail: true
      })

      // Constants
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/constants.js',
        templateFile: './subScene/constants.js.hbs',
        abortOnFail: true
      })

      // Selectors
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/selectors.js',
        templateFile: './subScene/selectors.js.hbs',
        abortOnFail: true
      })
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/tests/selectors.test.js',
        templateFile: './subScene/selectors.test.js.hbs',
        abortOnFail: true
      })

      // Reducer
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/reducer.js',
        templateFile: './subScene/reducer.js.hbs',
        abortOnFail: true
      })
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/tests/reducer.test.js',
        templateFile: './subScene/reducer.test.js.hbs',
        abortOnFail: true
      })
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/saga.js',
        templateFile: './subScene/saga.js.hbs',
        abortOnFail: true
      })
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/tests/saga.test.js',
        templateFile: './subScene/saga.test.js.hbs',
        abortOnFail: true
      })
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path:
          '../../src/scenes/{{properCase sceneName}}/scenes/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true
      })
    }

    actions.push({
      type: 'sub-scene-prettify'
    })

    return actions
  }
}
