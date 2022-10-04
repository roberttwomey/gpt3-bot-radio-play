#!/usr/bin/env node

'use strict';

const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');

const parser = new ArgumentParser({
    description: 'Parsing gpt-3 parameters with argparse. Read more about these at openai.'
});

// Arguments for gpt-3: 
// model: "davinci-instruct-beta",
// prompt: prompt,
// max_tokens: 256,
// temperature: 0.7,
// top_p: 1.0,
// presence_penalty: 0,
// frequency_penalty: 0,


const valid_models = [
    'text-davinci-002', 'text-curie-001', 'text-babbage-001', 'text-ada-001', 'text-davinci-001',
    'davinci-instruct-beta', 'davinci-instruct', 'curie-instruct-beta', 'curie-instruct',
    'babbage', 'ada'
];

parser.add_argument('prompt', {
    metavar: 'Prompt',
    type: 'str',
    nargs: '+',
    help: 'text to prompt gpt3'
})

parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-model', '--model', {
    type: 'str',
    choices: valid_models,
    default: 'davinci-instruct-beta',
    help: 'gpt-3 model' }
    );
parser.add_argument('-max_tokens', '--max_tokens', {
    type: 'int',
    default: 256,
    help: 'max tokens (1 to 4000, more costs more)'
});
parser.add_argument('-temperature', '--temperature', {
    type: 'float',
    default: 0.7,
    help: 'temp 0.0 to 1.0'
});
parser.add_argument('-top_p', '--top_p', {
    type: 'float',
    default: 1.0,
    help: 'top_p probability 0.0 to 1.0'
});
parser.add_argument('-presence_penalty', '--presence_penalty', {
    type: 'float',
    default: 0.0,
    help: 'presence_penalty penalty 0.0 to 2.0'
});
parser.add_argument('-frequency_penalty', '--frequency_penalty', {
    type: 'float',
    default: 0.0,
    help: 'presence_penalty penalty 0.0 to 2.0'
});

// parser.add_argument('-b', '--bar', { help: 'bar foo' });
// parser.add_argument('--baz', { help: 'baz bar' });

let args = parser.parse_args();

console.log('\nmodel: ', args['model'])
console.log('prompt: ', args['prompt'].join(' '))
// console.dir(args);