module.exports = {
   data: {
     name: "test",
     description: "test :3",
     integration_types: [
        0,
        1
     ],
     context: [0, 1, 2]
   },
   execute (interaction) {
//       await interaction.reply('very amogus test');
     throw new Error('error test :3');
   }
}
