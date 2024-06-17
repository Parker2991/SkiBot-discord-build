const moment = require('moment-timezone');
const CommandError = require('../../util/CommandError');
const { EmbedBuilder } = require('discord.js');
module.exports = {
  data: {
    options: [
      {
        type: 3,
        name: 'time-zone',
        description: 'time zone input',
        required: true,
      }
    ],
    name: 'time',
    name_localizations: undefined,
    description: 'check the time of a timezone',
    dm_permission: true,
    trustLevel: 0,
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
  execute(context) {
    const interaction = context.interaction;
    const config = context.config;
    const timezone = interaction.options.getString('time-zone')
    if (!moment.tz.names().map((zone) => zone.toLowerCase()).includes(timezone.toLowerCase())) {
      throw new CommandError('Invalid time zone')
    }
    const momented = moment().tz(timezone).format('dddd, MMMM Do, YYYY, hh:mm:ss A')
    const Embed = new EmbedBuilder()
            .setColor(`${config.colors.commands.embed}`)
            .setTitle(`${this.data.name} command`)
            .setDescription(`the date and time for the timezone ${timezone} is \u203a\n${momented}`)
    interaction.reply({ embeds: [Embed] })
  }
} // interaction.options.getString('input')
/*
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
      if (!moment.tz.names().map((zone) => zone.toLowerCase()).includes(timezone.toLowerCase())) {
        throw new CommandError('Invalid timezone')
      }

      const momented = moment().tz(timezone).format('dddd, MMMM Do, YYYY, hh:mm:ss A')
      const component = [{ text: 'date and time for the timezone ', color: 'dark_gray' }, { text: timezone, color: 'aqua' }, { text: ' is: ', 
color: 'dark_gray' }, { text: momented, color: 'green' }]
*/
