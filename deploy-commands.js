const { REST, Routes, SlashCommandBuilder, Client } = require('discord.js');
const { load } = require('js-yaml');
const fs = require('node:fs');
const path = require('node:path');
const config = load(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'));
const commands = [];
const foldersPath = path.join(__dirname, 'src/commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    try {
      if (command.data instanceof SlashCommandBuilder) {
        commands.push(command.data.toJSON());
        console.log(command.data.toJSON());
        console.log(command.data.trustLevel)
      } else {
        commands.push(command.data);
        console.log(command.data)
      }
    } catch (e) {
      console.log(e.stack)
    }
  }
}

const rest = new REST().setToken(config.client.token);

rest.put(Routes.applicationCommands(config.client.clientId), {
    body: []
  })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(
      Routes.applicationCommands(config.client.clientId), {
        body: commands
      },
    );
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error.stack);
  }
})();
