/**
 * subSceneExists
 *
 * Check whether the given scene exist in either the scenes directory
 */

const fs = require('fs')
const path = require('path')

function subSceneExists (comp, scene) {
  if (
    fs.existsSync(
      path.join(__dirname, `../../../src/scenes/${scene}/scenes`)
    ) === false
  ) {
    return false
  }
  const scenes = fs.readdirSync(
    path.join(__dirname, `../../../src/scenes/${scene}/scenes`)
  )
  return scenes.indexOf(comp) >= 0
}

module.exports = subSceneExists
