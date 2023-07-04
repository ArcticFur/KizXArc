/*UnamedBot project
Start Date: July 1st, 2023
Authors: Arctic_Angel, Kizune
https://discord.com/api/oauth2/authorize?client_id=1124899458073759814&permissions=8&scope=bot%20applications.commands*/

const {Client, Collection, Events, GatewayIntentBits} = require("discord.js");// Client, Collection, Events, and GatewayIntentBits all are part of the discord.js lib
const fs = require('node:fs');
const path = require('node:path');
const {token} = require("./config.json");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });//Makes the bot user with each intent. If we apply for more intents they can be added here

//Import commands from other files
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


//onetime run once client is okay to run
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);//Login to the bot user (Make sure last so it runs everything beforehand)

//javascript is weird 🥲

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

