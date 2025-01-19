import fs from 'node:fs';
import YAML from 'yaml';

import cli from './cli';

class Stepper {
	private steps: Step[] = [];
	private step = 0;

	public get currStep() {
		return this.step;
	}

	public get lastStep() {
		return this.steps.length - 1;
	}

	private options: string[] = [];
	private selectedOption = 0;

	constructor(path: string) {
		const file = fs.readFileSync(path, 'utf8');
		this.steps = YAML.parse(file);
	}

	public next() {
		this.step =
			this.step >= this.steps.length - 1
				? this.steps.length - 1
				: this.step + 1;
		this.selectedOption = 0;
	}

	public prev() {
		this.step = this.step <= 0 ? 0 : this.step - 1;
		this.selectedOption = 0;
	}

	public nextOption() {
		this.selectedOption =
			this.selectedOption >= this.options.length - 1
				? this.options.length - 1
				: this.selectedOption + 1;
	}

	public prevOption() {
		this.selectedOption =
			this.selectedOption <= 0
				? 0
				: this.selectedOption - 1;
	}

	public render() {
		const s = this.steps[this.step];
		this.options = this.steps[this.step].options;
		const opts = s.options.map((o, i) =>
			i === this.selectedOption ? cli.purple.underline(o) : o,
		);
		cli.log(`${s.title}\n  ${opts.join(' ')}`);
	}
}

export default Stepper;
