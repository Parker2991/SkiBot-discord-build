const fs = require('node:fs');
const path = require('node:path');
const { Collection, Events, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
function command_manager (bot, config) {
  bot.commands = new Collection();
  const foldersPath = path.join(__dirname, '../commands');
  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
     const commandsPath = path.join(foldersPath, folder);
     const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
     for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        try { 
           if (command.data instanceof SlashCommandBuilder) {
             bot.commands.set(command.data.name, command);
          } else {
             bot.commands.set(command.data.name, command);
             bot.commands.set(command.data.trustLevel)
          }
        } catch (e) {
          console.error(`Could not load command ${file}`)
          console.error(e.stack)
        }
     }
  }
  bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
      try {
        command = interaction.client.commands.get(interaction.commandName);
        console.log((interaction.user.username));
        console.log(config)
        if (!command) {
          console.error(`No command matching ${interaction.commandName} was found.`);
          return;
        }
        if (command.data.trustLevel > 0) {
          if (command.data.trustLevel === 1) {
            for (const trustedRoles of config.roles.trusted) {
              for (const trustedUser of config.users.trusted) {
                const hasRole = interaction?.member?.roles?.cache?.some(role => role.name === trustedRoles || role.name === config.roles.owner)
                const trusted = interaction.user.username === trustedUser;
                const owner = interaction.user.username === config.users.owner
                if (!hasRole && interaction.member.roles.cache !== undefined && interaction.member.roles.cache !== null) throw new Error('You are not trusted or the owner!');
                else if (hasRole && interaction.member.roles.cache !== undefined && interaction.member.roles.cache !== null) return command.execute(interaction, config, bot);
                else if (interaction.user.username !== trustedUser/* && interaction.user.username !== config.users.owner*/  /*&& interaction.member.roles.cache === undefined && interaction.member.roles.cache === null*/) throw new Error('You are not trusted or the owner!');
                else if (interaction.user.username === trustedUser /*&& interaction.user.username === config.users.owner*//*&& interaction.member.roles.cache === undefined && interaction.member.roles.cache === null*/) return command.execute(interaction, config, bot, command);
//                if (!hasRole) throw new Error('You are not trusted or the owner!')
              
              }
            }
          }
        } else {
          return await command.execute(interaction, bot, config, command)
        }
      } catch (error) {
        console.error(error.stack);
        const ErrorMessage = new EmbedBuilder()
                                 .setColor(`${config.colors.commands.error}`)
                                 .setTitle(`${command.data.name} Command`)
                                 .setDescription(`${error.message}`)
        const ErrorStack = new EmbedBuilder()
                                 .setColor(`${config.colors.commands.error}`)
                                 .setTitle(`${command.data.name} Command}`)
                                 .setDescription(`${error.stack}`)
        if (error instanceof Error)
        await interaction.reply({ embeds: [ErrorMessage] });
        else interaction.reply({ embeds: [ErrorStack] });
      }
  });
}

module.exports = command_manager;
