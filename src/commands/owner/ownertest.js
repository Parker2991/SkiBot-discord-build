const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'ownertest',
    name_localizations: undefined,
    description: 'Replies with your input!',
    dm_permission: true,
    trustLevel: 3,
    integration_types: [
       0,
       1,
    ],
    context: [
      0,
      1,
      2,
    ]
  },
  execute(interaction, bot, config, command) {
 //   interaction.reply(interaction.options.getString('input'));
    interaction.reply('WeEeEeEeEEEEEEEEEEEEeeeeeeeee');
  }
}
