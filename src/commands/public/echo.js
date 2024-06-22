module.exports = {
  data: {
    options: [
      {
        type: 3,
        name: 'input',
        description: 'The input to echo back',
        required: true,
      }
    ],
    name: 'echo',
    name_localizations: undefined,
    description: 'Replies with your input!',
    dm_permission: true,
    trustLevel: 0,
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
    interaction.reply(interaction.options.getString('input'));
  }
}
