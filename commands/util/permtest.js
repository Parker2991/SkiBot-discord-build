const { SlashCommandBuilder, ApplicationCommandType } = require('discord.js');
//setDMPermission
module.exports = {
//      integrationType: 1,
/*      data: new SlashCommandBuilder()
        .setDMPermission(false)
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
      			.setRequired(true)),*/
//  trustLevel: 0,
  data: {
    name: 'permtest',
    name_localizations: undefined,
    description: ':3',
    dm_permission: true,
    trustLevel: 1,
    integration_types: [
       0,
       1,
    ],
    "context": [
      0,
      1,
      2,
    ]
  },
  async execute(interaction, bot, config, command) {
/*
client.once('ready', ready => {
    ready.rest.post(Routes.applicationCommands(ready.user.id), {
        body: {
            name: "transcript",
            type: ApplicationCommandType.Message,
            integration_types: [1],
        }
    });
});
*/
     
//         if (interaction.options.getString('input') === '😺') {
//               interaction.send('Kitty! nya~ :3 >w< 😺 ')
//         } else {
          interaction.reply('meow :3')
//         }
  }
}