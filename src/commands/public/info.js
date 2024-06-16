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
            type: 1,
            name: 'server',
            description: 'Info about the bots server',
            options: [],
          },
          {
            type: 1,
            name: 'invite',
            description: 'the bots discord invite',
          },
          {
            type: 1,
            name: 'uptime',
            description: 'check the bots uptime'
          }
        ],
        name: 'info',
        description: 'bot info',
        "integration_types": [
          0,
          1,
        ],
        "context": [
          0,
          1,
          2,
        ]
      },
      async execute(interaction) {
	   if (interaction.options.getSubcommand() === 'server') {
             await interaction.reply(`Hostname \u203a ${os.hostname()}\nWorking Directory \u203a ${process.mainModule.path}\nOS \u203a ${os.platform()}\nKernal Version \u203a ${os.release()}\ncores \u203a ${os.cpus().length}\nCPU \u203a ${os.cpus()[0].model}\nServer Free memory ${Math.floor( os.freemem() / 1048576 )} MiB / ${Math.floor(os.totalmem() / 1048576)} MiB\nDevice uptime \u203a ${format(os.uptime())}\nNode version \u203a ${process.version}`)
           } else if (interaction.options.getSubcommand() === 'invite') {
              try {
                 let inviteEmbed = new EmbedBuilder()
                    .setColor(`#000000`)
                    .setTitle(`Invite Subcommand`)
                    .setDescription('Discord Invite ↓↓↓')
                 let inviteButton = new ButtonBuilder()
	            .setLabel('Discord Invite')
	            .setURL(`https://discord.gg/GCKtG4erux`)
	            .setStyle(ButtonStyle.Link);
                 let row = new ActionRowBuilder()
		    .addComponents(inviteButton);
                 interaction.reply({embeds: [inviteEmbed], components: [row]})
              } catch (e) {
                 interaction.reply(`${e.stack}`)
              }
           } else if (interaction.options.getSubcommand() === 'uptime') {
                    const Embed = new EmbedBuilder()
                                 .setColor(`#000000`)
                                 .setTitle(`Info uptime Subcommmand`)
                                 .setDescription(`${format(process.uptime())}`)
                    await interaction.reply({ embeds: [Embed] })

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
