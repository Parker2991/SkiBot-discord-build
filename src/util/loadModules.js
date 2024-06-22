const fs = require('fs');
const path = require('path');
function loadModules (bot, config) {
  bot.loadModules = (modules) => modules(bot, config); 
  for (const file of fs.readdirSync(path.join(__dirname, "../modules"))) {
    try {
      const modules = require(path.join(__dirname, '../modules', file))
      bot.loadModules(modules)
    } catch (e) {
      console.error(`Could not load module ${JSON.stringify(file)}`)
//      console.log(Object.keys(file))
      console.error(e.stack)
    }
  }
}
module.exports = loadModules;