const fs = require('fs');
const path = require('path');
function loadModules (client, config) {
//  const modulePath = path.join(__dirname, '../modules');
//  const moduleFiles = fs.readdirSync(modulePath).filter(file => file.endsWith('.js'));
  client.loadModules = (modules) => modules(client, config); 
  for (const file of fs.readdirSync(path.join(__dirname, "../modules"))) {
    try {
      const modules = require(path.join(__dirname, '../modules', file))
      client.loadModules(modules)
    } catch (e) {
      console.error(`Could not load module ${JSON.stringify(file)}`)
//      console.log(Object.keys(file))
      console.error(e.stack)
    }
  }
}
module.exports = loadModules;
