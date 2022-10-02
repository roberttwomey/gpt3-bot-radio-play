# radio-play-gpt3-bot
A gpt-3 bot for discord for the Radio Play project.

# Instructions
At the moment, you need to run the bot locally (using node.js) and have created an app with bot on Discord. 

## Setup
Assume you have install node.js and npm. 

1. Clone the repository: 
```git clone https://github.com/roberttwomey/radio-play-gpt3-bot
cd radio-play-gpt3-bot
```
2. Setup your node packages: 
```npm init -y
npm install openai discord.js dotenv```
3. Create the .env file: 
```touch .env```
4. Edit that .env file to include your OpenAI token and your Discord bot secret: 
```
OPENAI_API_KEY=XXXXXXXX
BOT_TOKEN=XXXXXXXX
```
   - your openAI token is here: [https://beta.openai.com/account/api-keys](https://beta.openai.com/account/api-keys)
   - your discord bot token is found here: [https://discord.com/developers/applications](https://discord.com/developers/applications)
5. Run the bot: 
```node index.js```
  - Press **CTRL-C** to quit.
