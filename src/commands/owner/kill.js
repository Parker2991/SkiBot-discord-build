module.exports = {
  data: {
    name: 'kill',
    description: 'kills the bots process',
    dm_permission: true,
    trustLevel: 2,
    integration_types: [
       0,
       1,
    ],
    context: [
      0,
      1,
      2,
    ]
  },
  execute(context) {
    const interaction = context.interaction;
    interaction.reply('killing the bots process,..........');
    process.exit(69);
  }
}
