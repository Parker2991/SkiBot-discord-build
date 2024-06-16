const { SlashCommandBuilder } = require('discord.js');
//setDMPermission
module.exports = {
//    trustLevel: 1,
    data: {
        name: 'validate',
        description: ':3',
        trustLevel: 1,
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
      async execute(interaction, config) {
        try {
          for (const trustedRoles of config?.roles?.trusted) {
            for (const trustedUser of config?.users?.trusted) {
              if (interaction?.member?.roles?.cache?.some(role => role?.name === trustedRoles) && interaction.member.roles.cache !== undefined || interaction.member.roles.cache === null) {
                await interaction?.reply({ content: 'valid trusted role' })
              } else if (interaction?.member?.roles?.cache?.some(role => role?.name === config?.roles?.owner) && interaction.member.roles.cache !== undefined || interaction.member.roles.cache === null) {
                await interaction?.reply({ content: 'valid owner role' })
              } else if (interaction?.user?.username === trustedUser && interaction.member.roles.cache === undefined || interaction.member.roles.cache === null) {
                await interaction?.reply({ content: 'valid trusted user' })
              } else if (interaction?.user?.username === config?.users?.owner && interaction.member.roles.cache === undefined || interaction.member.roles.cache === null) {
                await interaction.reply({ content: 'valid owner user' })
//                interaction.followUp('e')
              }
            }
          }
        } catch (e) {
          console.log(e.stack)
        }
// interaction.member.roles.cache !== undefined || interaction.member.roles.cache === null
// interaction.member.roles.cache === undefined || interaction.member.roles.cache === null
      }
}
