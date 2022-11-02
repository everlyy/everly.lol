class particle {
	constructor(x, y, size, speed, jitter, lifetime, hue_range) {
		this.i = 0;
		this.x = x;
		this.y = y;
		this.hue = Math.floor(Math.random() * (hue_range.to - hue_range.from) + hue_range.from);
		this.velx = speed;
		this.vely = speed;
		this.size = Math.random() * size;
		this.basex = x;
		this.basey = y;
		this.jitter = jitter;
		this.max_size = size;
		this.lifetime = lifetime;
		this.draw_shape = shapes.functions[Math.floor(Math.random() * shapes.functions.length)];
	}

	animate(dt, mx, my, sw, sh) {
		this.i += dt;
		this.x += dt * ((mx - sw / 2) * this.velx) * (this.size - this.max_size / 2);
		this.y += dt * ((my - sh / 2) * this.vely) * (this.size - this.max_size / 2);
	}

	draw(c) {
		// There's probably a much better way to get the transparency to fade in and out nicely
		// from a particle's lifetime, but I don't wanna think about it so enjoy looking at this mess
		let transparency = 1;
		if(this.i > this.lifetime / 2) {
			transparency = (this.i - (this.lifetime / 2)) / (this.lifetime / 2);
			transparency = 1 - transparency;
		} else {
			transparency = this.i / (this.lifetime / 2);
		}

		let color = `hsla(${this.hue}, 100%, 50%, ${transparency})`;

		c.beginPath();
		this.draw_shape(c, this.x, this.y, this.size);
		c.lineWidth = 1;
		c.strokeStyle = color;
		c.stroke();
		c.closePath();
	}

	draw_info(c) {
		c.beginPath();
		c.rect(this.x - this.max_size, this.y - this.max_size, this.max_size * 2, this.max_size * 2);
		c.lineWidth = 1;
		c.strokeStyle = "#fff";
		c.stroke();
		c.closePath();

		c.font = "7px monospace";
		let info = `${this.size.toFixed(2)} ${this.draw_shape.name}`;
		c.strokeText(info, this.x - this.max_size, this.y + this.max_size * 2 + 2); 

		c.beginPath();
		c.moveTo(this.x - this.max_size - 2, this.y - this.max_size - 1);
		c.lineTo(this.x - this.max_size - 2, this.y + this.max_size + 8);
		c.lineWidth = 2;
		c.strokeStyle = "#f00";
		c.stroke();
		c.closePath();
		c.beginPath();
		let y1 = this.y + this.max_size + 8;
		let y2 = this.y - this.max_size - 1;
		c.moveTo(this.x - this.max_size - 2, y1);
		c.lineTo(this.x - this.max_size - 2, y2 + (this.i / this.lifetime * (y1 - y2)));
		c.lineWidth = 2;
		c.strokeStyle = "#0f0";
		c.stroke();
		c.closePath();
	}

	is_alive() {
		return this.i < this.lifetime;
	}
}