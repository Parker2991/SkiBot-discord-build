const { REST, Routes, SlashCommandBuilder, Client } = require('discord.js');
const { load } = require('js-yaml');
//const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const config = load(fs.readFileSync('config.yml', 'utf8'));
const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'src/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
//		if ('data' in command && 'execute' in command) {
//			commands.push(command.data.toJSON());
                try {
                if (command.data instanceof SlashCommandBuilder) {
//                   command.data['context'] = [0, 1, 2]
//                   command.data['integration_types'] = [1] //setDMPermission
                  commands.push(command.data.toJSON());
                  console.log(command.data.toJSON());
                  console.log(command.data.trustLevel)
                } else {
//                 command.data['context'] = [0, 1, 2]
//                 command.data['integration_types'] = [1] //setDMPermission
                 commands.push(command.data);
                 console.log(command.data)
                 console.log(command.data.options)
                }
                } catch (e) {
                  console.log(e.stack)
    //            } else { 
      //             console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
//		}else {
//			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
//		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.client.token);
// for global commands
rest.put(Routes.applicationCommands(config.client.clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);
// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(config.client.clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
