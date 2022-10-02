require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const console = require('console')

const openai = new OpenAIApi(configuration);

let prompt = ``;

client.on("messageCreate", function(message) {
    if (message.author.bot) return;

    let trimmed = message.content.slice(23)
    console.log(message.type);

    if (message.type == 19) {
        console.log(`~ this is a reply, continue ~`);

        // const message1 = await message.fetchReference();
        // message.fetchReference().then(msg => console.log(msg.content))

        message.fetchReference().then(reference => { 
          // console.log(`prompt:${reference.content.slice(0,64)}...\n${message.content.slice(0,64)}...`)
          prompt=reference.content+`\n`+message.content;
          trimmed=prompt;
        });

    } else {
        console.log(`~ this is a new prompt ~`);
        prompt = trimmed;
    }

    console.log(`prompted: ${prompt.slice(0, 64)}...`);

    // check if they are commands
    if (trimmed.startsWith(`!clear`)) {
        prompt = ``;
        console.log(`\n\n~ cleared prompt ~\n\n`);
        message.reply(`~ cleared prompt ~`);
        return;
    } else if (trimmed.startsWith(`!print`) || trimmed.startsWith(`!prompt`)) {
        message.reply(`**prompt:**${prompt}`); // reply in discord
        return;
    } else {
        // not a command

        // prompt += `${message.content}`;

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
            
            // message.reply(`**${prompt}**${gptResponse.data.choices[0].text}`); // with bold markdown
            message.reply(`${prompt}${gptResponse.data.choices[0].text}`);
            
            console.log(`response: ${gptResponse.data.choices[0].text.slice(0, 64)}...`);
            prompt += `${gptResponse.data.choices[0].text}\n`;
        })();
    }

});



// ~~~ todo: what is an interaction? ~~~

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   const { commandName } = interaction;

//   if (commandName === 'ping') {
//     await interaction.reply('Pong!');
//   } else if (commandName === 'beep') {
//     await interaction.reply('Boop!');
//   }
// });

client.login(process.env.BOT_TOKEN);