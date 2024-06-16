const CommandError = require('../../util/CommandError');
module.exports = {
   data: {
     name: "errortest",
     description: "test errors",
     integration_types: [
        0,
        1
     ],
     context: [0, 1, 2]
   },
   execute (interaction) {
     throw new CommandError('error test :3');
   }
}
