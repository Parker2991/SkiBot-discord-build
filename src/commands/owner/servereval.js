const util = require('util');
const CommandError = require('../../util/CommandError');
const { EmbedBuilder } = require('discord.js');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
module.exports = {
  data: {
    options: [
      {
        type: 3,
        name: 'code',
        description: 'the code to output',
        required: true,
      }
    ],
    name: 'servereval',
    name_localizations: undefined,
    description: 'run js code unisolated',
    dm_permission: true,
    trustLevel: 2,
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
    const interaction = context.interaction;
    const bot = context.bot;
    const config = context.config;
    const command = context.command;
    try {
      const Embed = new EmbedBuilder()
              .setColor(`${config.colors.commands.embed}`)
              .setTitle(`${this.data.name} command`)
              .addFields(
                 { name: 'Code Output \u203a', value: `\`\`\`js\n${trim(util.inspect(eval(interaction.options.getString('code'))), 1015)}\`\`\`` },
                 { name: 'Code Input \u203a', value: `\`\`\`js\n${interaction.options.getString('code')}\`\`\`` },
              )
      interaction.reply({ embeds: [Embed] })
    } catch (e) {
      const Embed = new EmbedBuilder()
              .setColor(`${config.colors.commands.error}`)
              .setTitle(`${this.data.name} command`)

              .addFields(
                 { name: 'Error \u203a', value: `${e.toString()}` },
                 { name: 'Code Input \u203a', value: `${interaction.options.getString('code')}` },
              )
      interaction.reply({ embeds: [Embed] })
    }
  }
}

