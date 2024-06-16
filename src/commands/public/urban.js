const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
module.exports = {
  data: {
    options: [
      {
        type: 3,
        name: 'term',
        description: 'Defintion',
        required: true,
      }
    ],
    name: 'urban',
    description: 'search definitions on urban dictionary',
    trustLevel: 0,
    dm_permission: 1,
  },
  async execute(context) {
    const interaction = context.interaction;
    const bot = context.bot;
    const config = context.config;
    const command = context.command;
    const term = interaction.options.getString('term');
    const query = new URLSearchParams({ term });
    const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
    const { list } = await dictResult.body.json();
    if (!list.length) {
      return interaction.reply(`No results found for **${term}**.`)
    }
    const [answer] = list;
    console.log(answer)
    const embed = new EmbedBuilder()
                  .setColor(`${config.colors.commands.embed}`)
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
                  )
    interaction.reply({ embeds: [embed] });
  }
}

