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
//              .setDescription('e')
              .addFields(
                 { name: 'Code Output \u203a', value: `\`\`\`js\n${trim(util.inspect(eval(interaction.options.getString('code'))), 1015)}\`\`\`` },
                 { name: 'Code Input \u203a', value: `${interaction.options.getString('code')}` }, //`\`\`\`${error}\`\`\``
//                 { name: 'e', value: 'e' }
              )
/*              .addFields(
                  { name: `${interaction.options.getString('code')}`, value: '\u200b' },
                  { name: 'e', value: 'e' },
                  { name: '```js\n' + util.inspect(eval(interaction.options.getString('code'))) + '```', value: '\u200b' }
              )*/
      interaction.reply({ embeds: [Embed] })
    } catch (e) {
//      throw new CommandError(e.toString())
      const Embed = new EmbedBuilder()
              .setColor(`${config.colors.commands.error}`)
              .setTitle(`${this.data.name} command`)
//              .setDescription('e')
              .addFields(
                 { name: 'Error \u203a', value: `${e.toString()}` },
                 { name: 'Code Input \u203a', value: `${interaction.options.getString('code')}` }, //`\`\`\`${error}\`\`\``
//                 { name: 'e', value: 'e' }
              )
      interaction.reply({ embeds: [Embed] })
    }
  }
}
/*
const Embed = new EmbedBuilder()
              .setColor(`${bot.Commands.colors.discord.embed}`)
              .setTitle(`${this.name} Command`)
              .setDescription(`${command.name} info`)
              .addFields(
              // { name: '', value: `${bot.Discord.commandPrefix + command.name}` }
               {name: `${bot.discord.commandPrefix}${command.name} (Aliases: ${command.aliases}) \u203a ${command.description}`, value: `\u200b`,inline:false},
               { name: `Trust Level \u203a ${command.trustLevel}`,value:'\u200b'},
               { name: `Usage \u203a ${bot.discord.commandPrefix}${command.name} ${command.usage}`,value:'\u200b'},
              )
*/
