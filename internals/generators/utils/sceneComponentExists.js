/**
 * sceneComponentExists
 *
 * Check whether the given scene exist in either the scenes directory
 */

const fs = require('fs')
const path = require('path')

function sceneComponentExists (comp, scene) {
  if (
    fs.existsSync(
      path.join(__dirname, `../../../src/scenes/${scene}/components`)
    ) === false
  ) {
    return false
  }
  const scenes = fs.readdirSync(
    path.join(__dirname, `../../../src/scenes/${scene}/components`)
  )
  return scenes.indexOf(comp) >= 0
}

module.exports = sceneComponentExists
