const CommandError = require('../../util/CommandError');
module.exports = {
   data: {
     options: [
       {
         type: 3,
         choices: [
           {
             name: 'message',
             value: 'message',
             type: 1,
           },
           {
             name: 'stack',
             value: 'stack',
             type: 1,
           }
         ],
         name: 'options',
         description: 'error options',
         required: true,
       }
     ],
     name: "errortest",
     description: "test errors",
     integration_types: [
        0,
        1
     ],
     context: [0, 1, 2]
   },
   execute (context) {
     const interaction = context.interaction
     if (interaction.options.getString('options') === 'message') {
       throw new CommandError('Error message test :3');
     } else if (interaction.options.getString('options') === 'stack') {
       throw new Error('Error stack test :3');
     };
   }
}

