const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
module.exports = {
      integrationType: 1,
      data: new SlashCommandBuilder()
	.setName('urban')
	.setDescription('look up definitions on urban dictionary')
	.addStringOption(option =>
		option.setName('term')
			.setDescription('Defintion')
      			.setRequired(true)),
         async execute(interaction) {
		const term = interaction.options.getString('term');
		const query = new URLSearchParams({ term });

		const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
		const { list } = await dictResult.body.json();

		if (!list.length) {
			return interaction.reply(`No results found for **${term}**.`);
		}

		const [answer] = list;
                console.log(answer)
		const embed = new EmbedBuilder()
			.setColor("#00FFFF")
			.setTitle(answer.word)
			.setURL(answer.permalink)
                        .setDescription(`Author: ${answer.author}`)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
				{
					name: 'Rating',
					value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`,
				},
			);
		interaction.reply({ embeds: [embed] });
	}
}
/*
{
  definition: '[The best website].',
  permalink: 'http://susred.urbanup.com/17886748',
  thumbs_up: 0,
  author: '_yfd',
  word: 'sus.red',
  defid: 17886748,
  current_vote: '',
  written_on: '2023-08-13T01:01:44.638Z',
  example: '[Go to] sus.red for [best] [website] ever!!1!',
  thumbs_down: 0
}
*/
