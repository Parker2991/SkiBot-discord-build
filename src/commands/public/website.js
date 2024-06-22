const http = require('http');
const https = require('https');
const CommandError = require('../../util/CommandError.js');
const { EmbedBuilder } = require('discord.js');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
const util = require('util');
module.exports = {
  data: {
    options: [
      {
        type: 3,
        name: 'url',
        description: 'website url',
        required: true,
      }
    ],
    name: 'website',
    description: 'check website data',
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
  execute(context) {
    const interaction = context.interaction;
    const bot = context.bot;
    const config = context.config;
//    const CommandName = this.data.name
//    try {
    if (interaction?.options?.getString('url')?.startsWith('https://')) {
      https.get(`${interaction.options.getString('url')}`, (res) => {
        res.setEncoding('utf8');
        res.on('data', async (data) => {
          try {
          let Embed = new EmbedBuilder()
                .setColor(`${config.colors.commands.embed}`)
                .setTitle(`website command`)
                .setDescription(`\`\`\`${trim(data.toString(), 2000)}\`\`\``)
          console.log(data.length)
//          await interaction.deferReply();
          await interaction.reply({ embeds: [Embed] });
          } catch (e) {
          if (e.toString() === 'DiscordAPIError[10062]: Unknown interaction') {}
          else console.log(e.toString())
//            console.log(e)
          }
        })
      }).on('error', (e) => {
        let Embed = new EmbedBuilder()
              .setColor(`${config.colors.commands.error}`)
              .setTitle(`${this.data.name} command`)
              .setDescription(`\`\`\`${e.toString()}\`\`\``)
        interaction.reply({ embeds: [Embed] })
      })
    }
  //  } catch (e) {
    //  console.log(e.stack)
   // }
  }
}
/*
interaction.options.getString('time-zone')
     https.get(`${args.join(' ')}`, (res) => {
       res.setEncoding('utf8');
       res.on('data', (data) => {
         bot.tellraw({ text: data, color: 'dark_gray' })
       });
     }).on('error', (e) => {
        bot.sendError(`${e.toString()}`);
     }); 
*/
