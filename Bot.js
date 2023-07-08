/*UnamedBot project
Start Date: July 1st, 2023
Authors: Arctic_Angel, Kizune
https://discord.com/api/oauth2/authorize?client_id=1124899458073759814&permissions=8&scope=bot%20applications.commands*/

const {Client, Collection, Events, GatewayIntentBits} = require("discord.js");// Client, Collection, Events, and GatewayIntentBits all are part of the discord.js lib
const fs = require('node:fs');// File System
const path = require('node:path');
const {token} = require("./config.json"); // Take token from external file, "config.json"
const client = new Client({ intents: [GatewayIntentBits.Guilds] });// Makes the bot user with each intent. If we apply for more intents they can be added here

//Import commands from other files ->
client.commands = new Collection();// Array holding each command
const foldersPath = path.join(__dirname, './commands');// Set command folder(s) to ./commands
//For each item in the folder, "./commands", add each .js file to the client.commands collection
for (const file of fs.readdirSync(foldersPath)) {
	//Contruct filepath of each .js file in folder "commands"
	const commandsPath = path.join(foldersPath, file);
	const jsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); //jsFiles are only files that end with the .js extension
	//For each javascript file, set the filepath to ./commands/${jsfilename}/
	for (const jsFileName of jsFiles) {
		const filePath = path.join(commandsPath, jsFileName);
		const command = require(filePath);// set each file to command variable
		//Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
// <-

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(token);//Login to the bot user (Make sure last so it runs everything beforehand)

//javascript is weird 😭

