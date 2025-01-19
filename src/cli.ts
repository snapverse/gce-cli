import chalk from 'chalk';
import rlp from 'readline';

const Console = console;

const cli = {
	...console,
	purple: chalk.hex('#cc9af7'),
	log: (...args: string[]) => {
		Console.log(' ', ...args, ' ');
	},
	clear: Console.clear,
	exit: (code: number = 0): void => process.exit(code),
	on: (_event: 'keypress', callback: (key: Buffer) => void) => {
		const rl = rlp.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		process.stdin.setRawMode(true);
		process.stdin.resume();
		process.stdin.on('data', callback);
		return rl;
	}
};

export default cli;
