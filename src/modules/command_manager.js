const fs = require('node:fs');
const path = require('node:path');
const { Collection, Events, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const CommandError = require('../util/CommandError');
function command_manager (bot, config) {
  bot.commandManager = new Collection();
  bot.commandManager.commandList = []
  const foldersPath = path.join(__dirname, '../commands');
  const commandFolders = fs.readdirSync(foldersPath);
  for (const folder of commandFolders) {
     const commandsPath = path.join(foldersPath, folder);
     const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
     for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        try {
           let commandList = [];
           if (command.data instanceof SlashCommandBuilder) {
             bot.commandManager.set(command.data.name, command);
             bot.commandManager.commandList.push(command)
          } else {
             bot.commandManager.set(command.data.name, command);
             bot.commandManager.commandList.push(command);
//             bot.commandManager.set(command.data.trustLevel)
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
        command = bot.commandManager.get(interaction.commandName);
        console.log(`User: ${interaction.user.username}`);
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
                if (!hasRole && interaction.member.roles.cache !== undefined && interaction.member.roles.cache !== null) throw new CommandError('You are not trusted or the owner!');
                else if (hasRole && interaction.member.roles.cache !== undefined && interaction.member.roles.cache !== null) return command.execute({ interaction, config, bot, command });
                else if (interaction.user.username !== trustedUser) throw new CommandError('You are not trusted or the owner!');
                else if (interaction.user.username === trustedUser) return command.execute({ interaction, config, bot, command });
              }
            }
          }
        } if (command.data.trustLevel === 2) {
          const isOwner = interaction.user.username === config.users.owner
          if (!isOwner) throw new CommandError('You are not the owner!');
          else return command.execute({ interaction, config, bot, command });
        } if (command.data.trustLevel === 3) {
          throw new CommandError('This command has been disabled');
        } else {
          return await command.execute({ interaction, bot, config, command })
        }
      } catch (error) {
        console.error(error.stack);
        const ErrorMessage = new EmbedBuilder()
                                 .setColor(`${config.colors.commands.error}`)
                                 .setTitle(`${command.data.name} Command`)
                                 .setDescription('```' + error._message + '```')
        const ErrorStack = new EmbedBuilder()
                                 .setColor(`${config.colors.commands.error}`)
                                 .setTitle(`${command.data.name} Command}`)
                                 .setDescription('```' + error.stack + '```')
        if (error instanceof CommandError)
        await interaction.reply({ embeds: [ErrorMessage] });
        else interaction.reply({ embeds: [ErrorStack] });
      }
  });
}
module.exports = command_manager;
