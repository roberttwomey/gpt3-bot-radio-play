// from https://github.com/nodeca/argparse#example

const { ArgumentParser } = require('argparse')

const parser = new ArgumentParser({ description: 'Process some integers.' })

let sum = ints => ints.reduce((a, b) => a + b)
let max = ints => ints.reduce((a, b) => a > b ? a : b)

parser.add_argument('integers', { metavar: 'N', type: 'int', nargs: '+',
                                  help: 'an integer for the accumulator' })
parser.add_argument('--sum',    { dest: 'accumulate', action: 'store_const',
                                  const: sum, default: max,
                                  help: 'sum the integers (default: find the max)' });

let args = parser.parse_args()
console.log(args.accumulate(args.integers))