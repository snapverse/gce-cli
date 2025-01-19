class Sprite {
	private sprite: string = '';
	public length = 0;
	public pos = 0;

	constructor() {
		// ...
	}

	public async load(spritePath: string) {
		const { default: sprite } = await import(spritePath);
		this.length = sprite.length;
		this.sprite = sprite;
	}

	public toString() {
		const i = (this.pos + 1) % this.length;
		return this.sprite[i];
	}
}

export default Sprite;
