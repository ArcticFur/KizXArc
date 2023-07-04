//Good example command file
const { SlashCommandBuilder } = require('discord.js');;// Use command builder from discord.js lib

module.exports = {
	//Command data
	data: new SlashCommandBuilder()
		.setName('ping')//Command name
		.setDescription('Replies with Pong!'),// Command description
	//Command function
	async execute(interaction) {
		return interaction.reply('Pong!');// Reply to user who used the command
	},
};