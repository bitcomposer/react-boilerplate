/**
 * sceneExists
 *
 * Check whether the given scene exist in either the scenes directory
 */

const fs = require('fs')
const path = require('path')
const scenes = fs.readdirSync(path.join(__dirname, '../../../src/scenes'))

function sceneExists (comp) {
  return scenes.indexOf(comp) >= 0
}

module.exports = sceneExists
