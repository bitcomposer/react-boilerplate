/**
 * currentScenes
 *
 * Lists the current scenes in the scene directory
 */

const fs = require('fs');
const path = require('path');

function currentScenes() {
  return fs.readdirSync(path.join(__dirname, '../../../app/scenes'));
}

module.exports = currentScenes;
