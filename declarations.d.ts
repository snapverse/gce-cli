interface Step {
	key: string;
	title: string;
	options: string[];
	depends?: {
		key: string;
		value: string;
	};
}
