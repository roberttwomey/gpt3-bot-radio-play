require('dotenv').config();

const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages // for DMs
    ],
    'partials': [Partials.Channel] // for DMs
});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const console = require('console')

const openai = new OpenAIApi(configuration);
let gpt_prefs = {};
let verbose = false;

console.log('--== GPT-3 Bot Ready ==--');

function parseAndReply(message) {
    let prompt =``;
    if (verbose) console.log(message);

    // only reply to messages that directly @mention gpt3-bot
    if (message.mentions.has(client.user.id)) {
        console.log("detected @mention");

        if (message.type == 19) {
            // reply

            // const message1 = await message.fetchReference();
            // message.fetchReference().then(msg => console.log(msg.content))

            message.fetchReference().then((reference) => {
                thisprompt = message.content;
                prompt = reference.content + " " + thisprompt;
                console.log(`~ this is a continuation (REPLY ${message.type}) from ${reference.author} ~`);
            }, (reason) => {
                console.log(`~ continuation (${message.type}) but couldn't find reference ${reason} ~`);
                return;
            });


        } else {
            console.log(`~ this is a new prompt (${message.type}) from ${message.author}~`);
            console.log(`contents: ${message.content}`);

            prompt = message.content;

            // replace @mentions with nothing
            if (/^<@.?[0-9]*?>/.test(message.content)) {
                prompt = prompt.replace(/<@.?[0-9]*?>/g, "");
            };

            thisprompt = prompt;
        }

        console.log(`prompt: ${prompt.slice(0, 64)}...`);

        // STORE INDIVIDUAL PREFERENCES

        // // setting preferences
        // if (prompt.startsWith(`!prefs`)) {
        //     id = message.author[id];
        //     console.log(id)

        //     prefs[id] = {
        //         model: "davinci-instruct-beta",
        //         prompt: prompt,
        //         max_tokens: 256,
        //         temperature: 0.7,
        //         top_p: 1.0,
        //         presence_penalty: 0,
        //         frequency_penalty: 0,
        //     };

        //     console.log(`preferences for ${id}:\n${prefs[id]}`);
        //     return;
        // }

        // prompt += `${message.content}`;

        // check if prompt is too long
        // if (prompt.length >= 2000) {
        //   prompt=prompt.slice(-2000, -1);
        //   console.log(" ~~~ trimming long prompt ~~~");
        // }

        const gpt_args = {
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 256,
            temperature: 0.7,
            top_p: 1.0,
            presence_penalty: 0,
            frequency_penalty: 0,
        };

        // ARGUMENTS
        // experimental: check for model arguments: 
        // const args = prompt.split('--');

        // if (args.length > 1) {
        //   console.log('Arguments:')
        //     args.slice(1).forEach(function(element) {
        //       let kvpair = element.split(' ');

        //       if (kvpair[0] in gpt_args) { 
        //         gpt_args[kvpair[0]] = kvpair[1];
        //         console.log('\t*'+kvpair[0]+': '+kvpair[1]);
        //       } else {
        //         console.log('\t'+kvpair[0]+': '+kvpair[1]);
        //       }
        //     }, this);
        // }
        // prompt = args[0];

        // ping open for completion
        (async () => {
            // create completion with given params
            const gptResponse = await openai.createCompletion(gpt_args);

            completion = gptResponse.data.choices[0].text;
            console.log(`completion: ${completion.slice(0, 64)}...`);

            let response = prompt + completion;

            // trim if the response is too long (Discord limits posts to 2000 words)
            if (response.length >= 2000) {
                console.log(`NOTICE: prompt+completion is too long (${response.length}) ,just returning completion (${completion.length})`);
                response = thisprompt + " " + completion;
                response = response.slice(-2000, -1);
            }
            // console.log(response.length)

            message.reply(response);
        })();

    } else {
        console.log("~ no mention in message ~");
    }
}

client.on("messageCreate", function(message) {

    // ignore messages from bots
    if (message.author.bot) return;

    // console.log(message.author);
    // console.log(message.type);

    parseAndReply(message);


});

// TODO: Check edited messages

client.on('messageUpdate', (oldMessage, newMessage) => {
   console.log(`~ saw edited message from ${newMessage.author}~`)
   parseAndReply(newMessage);
})

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