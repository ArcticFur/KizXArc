/*UnamedBot project
Start Date: July 1st, 2023
Authors: Arctic_Angel, Kizune
https://discord.com/api/oauth2/authorize?client_id=1124899458073759814&permissions=8&scope=bot%20applications.commands*/

const {Client, Events, GatewayIntentBits} = require("discord.js");// Client, Events, and GatewayIntentBits all are part of the discord.js lib
const {token} = require("./config.json");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });//Makes the bot user with each intent. If we apply for more intents they can be added here

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