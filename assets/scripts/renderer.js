const info_elem = document.getElementById("renderer-info");
const status_elem = document.getElementById("renderer-status");
let debug = false;
let draw_particle_info = false;
let animate_particles = true;
let disable_drawing = false;

const particles_per_second = 100;
const particle_lifetime = 4;
const particle_speed = .1;
const particle_jitter = .1;
const particle_size = 5;
const hue_range = { from: 270, to: 330 };

let prev_time = Date.now() / 1000;
let delta_time = 0.00;

const canvas = document.getElementById("canvas-background");
let ctx = canvas.getContext("2d");
let particles = []
let mouse = { x: 0, y: 0 }

function main() {
	// Call resize so canvas takes up full screen
	resize();
	setInterval(draw, 0);
	setInterval(add_particle, 1000 / particles_per_second);

	// Add a bunch of particles so the site isn't completely empty on load
	for(let i = 0; i < particles_per_second / 2; i++)
		add_particle();
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	mx = window.innerWidth / 2;
	my = window.innerHeight / 2;
}

function mousemove(e) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}

function keydown(e) {
	switch(e.keyCode) {
		case 32: // Space
			animate_particles = !animate_particles;
			break;
		case 81: // Q
			debug = !debug;
			if(!debug)
				info_elem.innerHTML = "";
			break;
		case 87: // W
			draw_particle_info = !draw_particle_info;
			break;
		case 69: // E
			disable_drawing = !disable_drawing;
			break;
	}

	status_elem.innerHTML = "";
	if(!animate_particles)
		status_elem.innerHTML += "(Space) ANIMATION PAUSED<br>";
	if(draw_particle_info)
		status_elem.innerHTML += "(W) PARTICLE INFO<br>"
	if(disable_drawing)
		status_elem.innerHTML += "(E) DRAWING DISABLED<br>";	
}

function draw() {
	delta_time = Date.now() / 1000 - prev_time;
	prev_time = Date.now() / 1000;

	if(debug) {
		const fps = Math.round(1 / delta_time);
		const framtime = Math.round(delta_time * 1000);
		info_elem.innerHTML = `(Q) ${fps} fps (${framtime}ms) @ ${canvas.width}x${canvas.height} - mouse: [${mouse.x}, ${mouse.y}] - ${particles.length} particles`;
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(disable_drawing)
		return;

	for(let i = 0; i < particles.length; i++) {
		p = particles[i];

		if(animate_particles)
			p.animate(delta_time, mouse.x, mouse.y, canvas.width, canvas.height);

		if(!p.is_alive()) {
			particles.splice(i, 1);
			continue;
		}
 		
		p.draw(ctx);

		if(draw_particle_info)
			p.draw_info(ctx);
	}
}

function add_particle() {
	if(!animate_particles || disable_drawing)
		return;

	particles.push(new particle(
		Math.random() * canvas.width, 
		Math.random() * canvas.height, 
		particle_size, 
		particle_speed, 
		particle_jitter, 
		particle_lifetime,
		hue_range
	));
}