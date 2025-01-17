import chalk from 'chalk';
import LOADING_SPRITE from '../assets/textures/loading.json' assert { type: 'json' };

class Cli {
	public static run() {
		new Cli().render();
	}

	private update(tick: number) {
		console.clear();

		const spriteIndex = (tick + 1) % LOADING_SPRITE.length;
		const pink = chalk.hex('#E27BB1');
		console.log(
			`${LOADING_SPRITE[spriteIndex]} Please wait, we are 🍳 something ${pink('very sweet...')}`,
		);
	}

	private loop() {
		let ticks = 0;
		setInterval(() => {
			this.update(ticks);
			ticks++;
		}, 1000 / 10); // fps
	}

	public render() {
		console.clear();
		this.loop();
	}
}

export default Cli;
