const fs = require('node:fs');
const path = require('node:path');
const { load } = require('js-yaml');
const { Client, Collection, GatewayIntentBits, SlashCommandBuilder, Partials, Routes } = require('discord.js');
const loadEvents = require('./util/loadEvents');
const loadModules = require('./util/loadModules');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages], partials: [ Partials.Channel, Partials.Message] });

if (!fs.existsSync(path.join(__dirname, '../config.yml'))) {
  console.log('Config not found copying \x1b[0m\x1b[32mconfig\x1b[0m from \u001b[202mdefault\x1b[0m config')
  fs.copyFileSync(
     path.join(__dirname, 'default.yml'),
     path.join(__dirname, '../config.yml')
  )
}

try {
  config = load(fs.readFileSync(path.join(__dirname, '../config.yml'), 'utf8'));
} catch (e) {
  console.error(e.toString());
}

loadModules(bot, config);

bot.login(config.client.token);

bot.on('ready', (ready) => {
  bot.user.setPresence({
    activities: [{ name: `${config.client.presence.name}`, type: config.client.presence.type }],
    status: `${config.client.presence.status}`
  });
  console.log(`Logged in as ${bot.user.tag}`)
})

