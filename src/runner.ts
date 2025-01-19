import cli from './cli';
import Key from './key';
import Sprite from './sprite';
import Stepper from './stepper';

class Runner {
	private listener!: (key: Buffer) => void;
	private loading!: Sprite;
	private createSteps!: Stepper;

	public static run() {
		new Runner().render();
	}

	constructor() {
		this.loading = new Sprite();
		this.createSteps = new Stepper('./res/steps/create.yml');
	}

	private async update(tick: number) {
		cli.clear();

		if (this.createSteps.lastStep === this.createSteps.currStep) {
			await this.loading.load('@res/textures/loading.json');
			this.loading.pos = tick % this.loading.length;
			cli.log(
				`${this.loading.toString()} Please, let it ${cli.purple('cook...')}\n  (Actually this is not going to stop 😅)`,
			);
		} else {
			this.createSteps.render();
		}
	}

	private loop() {
		let ticks = 0;
		setInterval(() => {
			this.update(ticks);
			ticks++;
		}, 1000 / 10); // 10fps
	}

	public render() {
		this.listener = (key: Buffer) => {
			switch (key.toString()) {
				case Key.ArrowLeft:
					this.createSteps.prevOption();
					break;
				case Key.ArrowRight:
					this.createSteps.nextOption();
					break;
				case Key.Enter:
					this.createSteps.next();
					break;
				case Key.Erase:
					this.createSteps.prev();
					break;
				case Key.Esc:
					cli.exit();
					break;
				case Key.CtrlC:
					cli.exit();
					break;
				default:
					console.log(key);
					break;
			}
		};

		cli.on('keypress', this.listener);

		this.loop();
	}
}

export default Runner;

// const loading: Sprite = new Sprite();
// await loading.load('@res/textures/loading.json');
// loading.pos = tick % loading.length;

// cli.log(
// 	`${loading.render()} Please wait, we are 🍳 something ${cli.purple('very sweet...')}`,
// );
