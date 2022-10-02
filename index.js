require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const console = require('console')

const openai = new OpenAIApi(configuration);

let prompt=``;

client.on("messageCreate", function (message) {
   if (message.author.bot) return;

   let trimmed = message.content.slice(23)

   if (trimmed.startsWith(`!clear`)) {
      prompt=``;
      console.log(`\n\n~ cleared prompt ~\n\n`);
      message.reply(`~ cleared prompt ~`);
      return;
    } else if (trimmed.startsWith(`!print`) || trimmed.startsWith(`!prompt`)) {
      message.reply(`**prompt:** ${prompt}`);
      return;
    } else {

     // prompt += `${message.content}`;
     prompt += `${trimmed}`;
     console.log(prompt);

  (async () => {
        const gptResponse = await openai.createCompletion({
            model: "davinci-instruct-beta",
            prompt: prompt,
            max_tokens: 256,
            temperature: 0.7,
            top_p: 1.0,
            presence_penalty: 0,
            frequency_penalty: 0,
          });
        message.reply(`**${prompt}**${gptResponse.data.choices[0].text}`);
        prompt += `${gptResponse.data.choices[0].text}\n`;
    })();
   }

});  

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'beep') {
    await interaction.reply('Boop!');
  }
});

client.login(process.env.BOT_TOKEN);

