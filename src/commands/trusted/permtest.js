const { SlashCommandBuilder } = require('discord.js');
module.exports = {
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
  execute(interaction, bot, config, command) {
    interaction.reply('meow :3')
  }
}
