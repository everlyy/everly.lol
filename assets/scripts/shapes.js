class shapes {
	static functions = [
		this.circle,
		this.plus,
		this.heart
	];

	static circle(c, x, y, size) {
		c.arc(x, y, size, 0, 2 * Math.PI, false);
	}

	static plus(c, x, y, size) {
		c.moveTo(x - size, y);
		c.lineTo(x + size, y);
		c.moveTo(x, y - size);
		c.lineTo(x, y + size);
	}

	static heart(c, x, y, size) {
		c.arc(x - size / 2, y, size / 2, 1 * Math.PI, 2 * Math.PI, false);
		c.arc(x + size / 2, y, size / 2, 1 * Math.PI, 2 * Math.PI, false);
		c.moveTo(x - size, y);
		c.lineTo(x, y + size);
		c.moveTo(x + size, y);
		c.lineTo(x, y + size);
	}
}