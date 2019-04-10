/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const componentGenerator = require('./component/index.js')
const containerGenerator = require('./container/index.js')
const sceneGenerator = require('./scene/index.js')
const sceneComponentGenerator = require('./sceneComponent/index.js')
const subSceneGenerator = require('./subScene/index.js')

module.exports = plop => {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
  plop.setGenerator('scene', sceneGenerator)
  plop.setGenerator('sceneComponent', sceneComponentGenerator)
  plop.setGenerator('subScene', subSceneGenerator)
  plop.addHelper('containers-directory', comp => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../src/containers/${comp}`),
        fs.F_OK
      )
      return `containers/${comp}`
    } catch (e) {
      return `components/${comp}`
    }
  })
  plop.addHelper('scenes-directory', comp => {
    try {
      fs.accessSync(path.join(__dirname, `../../src/scenes/${comp}`), fs.F_OK)
      return `scenes/${comp}`
    } catch (e) {
      return `components/${comp}`
    }
  })
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../src/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**.js'
    )}`
    exec(`npm run prettify -- "${folderPath}"`)
    return folderPath
  })
  plop.setActionType('scene-component-prettify', answers => {
    const folderPath = `${path.join(
      __dirname,
      '/../../src/scenes',
      plop.getHelper('properCase')(answers.sceneName),
      'components',
      plop.getHelper('properCase')(answers.name),
      '**.js'
    )}`
    exec(`npm run prettify -- "${folderPath}"`)
    return folderPath
  })
  plop.setActionType('sub-scene-prettify', answers => {
    const folderPath = `${path.join(
      __dirname,
      '/../../src/scenes',
      plop.getHelper('properCase')(answers.sceneName),
      'scenes',
      plop.getHelper('properCase')(answers.name),
      '**.js'
    )}`
    exec(`npm run prettify -- "${folderPath}"`)
    return folderPath
  })
}
