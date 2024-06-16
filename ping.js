const { SlashCommandBuilder } = require('discord.js');

module.exports = {
/*	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),*/
	async execute(context) {
                const interaction = context.interaction;
		await interaction.reply('Pong!');
	},
};
