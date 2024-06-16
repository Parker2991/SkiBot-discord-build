module.exports = {
  data: {
    name: 'permtest',
    name_localizations: undefined,
    description: ':3',
    dm_permission: true,
    trustLevel: 1,
    integration_types: [
       0,
       1,
    ],
    "context": [
      0,
      1,
      2,
    ]
  },
  execute(context) {
    const interaction = context.interaction;
    interaction.reply('meow :3')
  }
}
