const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('kitty!'),
	async execute(interaction) {
        try {
		const catResult = await request('https://aws.random.cat/meow');
		const { file } = await catResult.body.json();
		interaction.reply({ files: [{ attachment: file, name: 'cat.png' }] });
        } catch (e) {

         console.log(e.stack)
        }	
	},
};
