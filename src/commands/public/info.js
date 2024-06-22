const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');
const os = require('os');
function format(seconds) {
          function pad(s) {
            return (s < 10 ? "0" : "") + s;
          }
          var hours = Math.floor(seconds / (60 * 60));
          var minutes = Math.floor((seconds % (60 * 60)) / 60);
          var seconds = Math.floor(seconds % 60);
           return (pad(`${hours} Hours`) + " " + 
            pad(`${minutes} Minutes`) + " " +
             pad(`${seconds} Seconds`))
          }
module.exports = {
  data: {
    options: [
      {
        type: 3,
        name: 'options',
        description: 'info options',
        required: true,
        choices: [
          {
            name: 'server',
            value: 'server',
            type: 1,
          },
          {
            name: 'invite',
            value: 'invite',
            type: 1,
          },
          {
            name: 'uptime',
            value: 'uptime',
            type: 1,
          },
          {
            name: "version",
            value: "version",
            type: 1,
          }
        ]
      }
    ],
    name: 'info',
    description: 'bot info',
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
  async execute(context) {
    const interaction = context.interaction;
    const bot = context.bot;
    const config = context.config;
    const command = context.command
    if (interaction.options.getString('options') === 'server') {
//      await interaction.reply(`Hostname \u203a ${os.hostname()}\nWorking Directory \u203a ${process.mainModule.path}\nOS \u203a ${os.platform()}\nKernal Version \u203a ${os.release()}\ncores \u203a ${os.cpus().length}\nCPU \u203a ${os.cpus()[0].model}\nServer Free memory ${Math.floor( os.freemem() / 1048576 )} MiB / ${Math.floor(os.totalmem() / 1048576)} MiB\nDevice uptime \u203a ${format(os.uptime())}\nNode version \u203a ${process.version}`)
      const Embed = new EmbedBuilder()
              .setColor(`${config.colors.commands.embed}`)
              .setTitle(`${this.data.name} command}`)
              .setDescription(`Hostname \u203a ${os.hostname()}\nWorking Directory \u203a ${process.mainModule.path}\nOS \u203a ${os.platform()}\nKernal Version \u203a ${os.release()}\ncores \u203a ${os.cpus().length}\nCPU \u203a ${os.cpus()[0].model}\nServer Free memory ${Math.floor( os.freemem() / 1048576 )} MiB / ${Math.floor(os.totalmem() / 1048576)} MiB\nDevice uptime \u203a ${format(os.uptime())}\nNode version \u203a ${process.version}`)
      await interaction.reply({ embeds: [Embed] })
    } else if (interaction.options.getString('options') === 'invite') {
      let inviteEmbed = new EmbedBuilder()
            .setColor(`${config.colors.commands.embed}`)
            .setTitle(`${this.data.name} command`)
            .setDescription('Discord Invite')
      let inviteButton = new ButtonBuilder()
            .setLabel('Discord Invite')
            .setURL(`${config.client.invite}`)
            .setStyle(ButtonStyle.Link);
      let row = new ActionRowBuilder()
            .addComponents(inviteButton);
      interaction.reply({ embeds: [inviteEmbed], components: [row] })
    } else if (interaction.options.getString('options') === 'uptime') {
      const Embed = new EmbedBuilder()
              .setColor(`${config.colors.commands.embed}`)
              .setTitle(`${this.data.name} command`)
              .setDescription(`${format(process.uptime())}`)
      await interaction.reply({ embeds: [Embed] })
    } else if (interaction.options.getString('options') === 'version') {
      await interaction.reply(`${process.env["buildstring"]}`)
    }
  },
};
/*
   data: {
     name: "test",
     description: "test :3",
     "integration_types": [
        1
     ],
     "context": [0, 1, 2]
   },
*/
