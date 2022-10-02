# radio-play-gpt3-bot
A gpt-3 bot for discord for the Radio Play project. To use this, you need to create an application through the Discord developers panel ([https://discord.com/developers/applications](https://discord.com/developers/applications)), and then run this nodes.js code locally. See [Installation](#installation) below.

## Configuration

[TK]

## Usage

If everything is configured properly and your local bot code is running, you should see **@gpt3-bot** in your server. You can interact by messaging it in a text channel as described below. 

### Starting a prompt

To start a new prompt, @message the bot with the text of your prompt, f.ex.: 
```
@gpt3-bot There was a mysterious place that occupied my childhood imagination. My bed transformed into a spaceship at night. This place was
```

This will prompt gpt-3 for a completion using default parameters and language model. Your results will look contain the prompt and completion. For instance:
```
There was a mysterious place that occupied my childhood imagination. My bed transformed into a spaceship at night. This place was the magical land of Mars.

I would wait for my mom to close my bedroom door and then I would say my prayers and whisper the words, "Mars, Mars, Mars" over and over again.

I would try to put myself into a deep sleep and then I would imagine that my bed was slowly ascending into the sky.
```

### Continuing a prompt

To continue a prompt you started, simply reply to the most recent message. In Discord, click the **Reply** button. <img width="40" alt="image" src="https://user-images.githubusercontent.com/1598545/193463923-9ae63096-3775-4247-8fda-fa5ea8c18ef7.png"> Whatever text you type will be appended and used as the new prompt, and results will be returned. You can continue this as long as you like.


### Tuning parameters

[TK]

## Installation

At the moment, you need to run the bot locally (using node.js) and have created an app with bot on Discord. 

Assume you have install node.js and npm. 

1. Clone the repository: 
```
git clone https://github.com/roberttwomey/radio-play-gpt3-bot
cd radio-play-gpt3-bot
```
2. Setup your node packages: 
```
npm init -y
npm install openai discord.js dotenv
```

3. Create the .env file: 
```
touch .env
```

4. Edit that .env file to include your OpenAI token and your Discord bot secret: 

```
OPENAI_API_KEY=XXXXXXXX
BOT_TOKEN=XXXXXXXX
```

   - your openAI token is here: [https://beta.openai.com/account/api-keys](https://beta.openai.com/account/api-keys)
   - your discord bot token is found here: [https://discord.com/developers/applications](https://discord.com/developers/applications)

### Run the bot
You run the bot locally with node.js. In your terminal, type:

```
node index.js
```

Now you should see @gpt3-bot go live on your server. You can interact with it there. (see [Usage](#usage))

Your local application will post messages to the console to show you what it is doing. 

Press **CTRL-C** to quit.
  
## References
