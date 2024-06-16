const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'help',
    name_localizations: undefined,
    description: 'see the bots commands',
    dm_permission: true,
    trustLevel: 0,
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
  execute(context) {
    const bot = context.bot;
    const interaction = context.interaction;
    const config = context.config;
    const commandManager = bot.commandManager;
    let public = [];
    let trusted = [];
    let owner = [];
    for (const commands of commandManager.commandList) {
      const command = commandManager.commandList
      if (commands.data.trustLevel === 0) {
        public.push(commands.data.name + ' ')
      } else if (commands.data.trustLevel === 1) {
        trusted.push(commands.data.name + ' ')
      } else if (commands.data.trustLevel === 2) {
        owner.push(commands.data.name + ' ')
      }
    }
    const Embed = new EmbedBuilder()
              .setColor(`${config.colors.commands.embed}`)
              .setTitle(`${this.data.name} Command`)
              .setDescription(`Commands (${commandManager.commandList.filter(c => c.data.trustLevel != 3).length})`)
              .addFields(
              { name: 'Public', value: public.toString().replaceAll(',','') },
              { name: 'Trusted', value: trusted.toString().replaceAll(',','') },
              { name: 'Owner', value: owner.toString().replaceAll(',','') },
              )
    interaction.reply({ embeds: [Embed] })
  }
}
