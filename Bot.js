/*UnamedBot project
Start Date: July 1st, 2023
Authors: Arctic_Angel, Kizune*/

const {client, Events, GatewayIntentBits} = require("discord.js");// Client, Events, and GatewayIntentBits all are part of the discord.js lib
const token = "MTEyNDg5OTQ1ODA3Mzc1OTgxNA.Ga8T0W.7fprlux2PlYMoAiIdIf5MSSZXrSJ7dtaYIK_oQ";
const client = new Client({ intents: [GatewayIntentBits.Guilds]});//Makes the bot user with each intent. If we apply for more intents they can be added here

//onetime run once client is okay to run
client.once(Events.ClientReady, c => {
    //yuh
});

client.login(token);//Login to the bot user (Make sure last so it runs everything beforehand)

//Kiz schooling VVVV
let five = 5

console.log(five)

const array = [1,2,3]

const obj = {integery: 4, stringy: "hello"}

console.log(obj.integery)

console.log(obj.stringy)



//cry