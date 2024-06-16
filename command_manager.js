const fs = require('node:fs');
const path = require('node:path');
const { Collection, Events, SlashCommandBuilder } = require('discord.js');
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
             console.log(command)
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
        const command = interaction.client.commands.get(interaction.commandName);
        console.log((interaction.type));
        console.log(Object.keys(config))
        if (!command) {
          console.error(`No command matching ${interaction.commandName} was found.`);
          return;
        }
        if (command.data.trustLevel > 0) {
          if (command.data.trustLevel === 1) {
            let trustedRoles = config.roles.trusted
            for (const roles of config.roles.trusted) {
               hasRole = interaction.member.roles.cache.some(role => role.name === roles || role.name === config.roles.owner)
               console.log(hasRole)
                if (!hasRole && hasRole !== undefined && hasRole !== null) throw new Error('You are not trusted!')
                else if (hasRole && hasRole !== undefined && hasRole !== null) return command.execute(interaction)
            }
            for (const userId of config.trustedUsers) {
               if (!hasRole && interaction.user.id !== '10737775175189340' /*userId*/ && hasRole === undefined || hasRole === null) throw new Error(':cat:');
               else if (!hasRole && interaction.user.id === '10737775175189340'/*userId*/ && hasRole === undefined || hasRole === null) return command.execute(interaction); 
//               if (!hasRole && interaction.member.roles.cache !== undefined && !hasRole !== null) throw new Error('You are not trusted!')
//               else if (interaction.user.id !== `${userId}` && interaction.member.roles.cache === undefined) throw new Error(':cat:');
               //if (!interaction.user.id === `${id}`) throw new Error('meow :3');
  //             else if (!interaction.user.id !== `${userId}` && interaction.member.roles.cache === undefined) return command.execute(interaction)
  //             else if (hasRole && interaction?.member.roles.cache !== undefined) return command.execute(interaction)
            }
          }
        } else {
          return await command.execute(interaction, bot, config, command)
        }
      } catch (error) {
        console.error(error.stack);
        if (error instanceof Error)
          await interaction.reply({ content: `${error.message}` });
          else interaction.followUp({ content: 'An error has occured while executing this command' })
      }
  });
}
/*
 if (!interaction.user.id === '1073777517518934037') {
  //              interaction.reply('perm test')
*/
module.exports = command_manager;
