function Circuitry($container)
{
	var self = this;

	if(typeof $container === 'undefined' || !$container || $container.length === 0)
	{
		throw new Error('Circuitry could not initialize ($container is falsy)');
		return false;
	}

	this.$container = $container;

	this._WZ =
	{
		w: this.$container.width(),
		h: this.$container.height()
	}

	this.renderer = new PIXI.WebGLRenderer(this._WZ.w, this._WZ.h,
	{
		backgroundColor: 0x1E824C,
		antialias: true,
		autoResize: true
	});

	this.$container.append(this.renderer.view);

	this.stage = new PIXI.Container();


	// INTERACTION
	this.interaction = this.renderer.plugins.interaction;


	this.g = new PIXI.Graphics();
	this.stage.addChild(this.g);

	self.style = 
	{
	    font : 'bold 50px Arial',
	    fill : '#FFFFFF',
	    stroke : '#000000',
	    strokeThickness : 6,
	    dropShadow : false,
	    dropShadowColor : '#000000',
	    dropShadowAngle : Math.PI / 4,
	    dropShadowDistance : 6
	};

	self.richText = new PIXI.Text('circuitry', self.style);
	self.richText.x = self._WZ.w / 2 - self.richText.width / 2;
	self.richText.y = self._WZ.h / 2 - self.richText.height / 2;

	//self.stage.addChild(self.richText);

	this.px = 100;
	this.py = 100;

	this.grid = new CGrid(50, 50, this.$container, this.stage);

	this.testwindow = new CWindow(this.stage, 100, 100, 400, 300, "Test window", function(g) { console.log('t')});

	this.stage.swapChildren(this.g, this.grid.g)
	//this.stage.swapChildren(this.grid.g, this.testwindow.g)


	// TIMING
	this.t = 
	{
		now: null,
		dt: 0,
		last: CUtils.timestamp(),
		step: 1/60,
		time: 0
	}

	this.events = new CEvents();
	this.bindKeys();

	this.step();
	return this;
}

Circuitry.prototype.step = function()
{
	var self = this;

	self.t.now = CUtils.timestamp();
	self.t.dt = self.t.dt + Math.min(1, (self.t.now - self.t.last) / 1000);

	while(self.t.dt > self.t.step) 
	{
		self.t.dt = self.t.dt - self.t.step;
		self.update(self.t.step);
	}

	self.render(self.t.dt);

	self.t.time += (self.t.now - self.t.last);
	self.t.last = self.t.now; 
	requestAnimationFrame(this.step.bind(self));
}

Circuitry.prototype.update = function(dt)
{
	var self = this;

	this.grid.update(dt, this.interaction);
	this.testwindow.update(dt, self.t.time);
}

Circuitry.prototype.render = function(dt)
{
	var self = this;

	this.grid.draw(dt);
	this.testwindow.draw(dt);

	/*self.px = self._WZ.w / 2 + Math.cos(self.t.time / 300) * 300;
	self.py = self._WZ.h / 2 + Math.sin(self.t.time / 300) * 300;

	self.g.clear();
	this.g.lineStyle(3, 0x000000, 1);
	this.g.beginFill(0xc0392b, 1);
	this.g.drawCircle(self.px, self.py, 20);
	this.g.beginFill(0x2980b9, 1);
	this.g.drawCircle(self.px + Math.cos(Math.cos(20) * self.t.time / 300) * -80, self.py + Math.sin(Math.sin(20) * self.t.time / 300) * -80, 15);
	this.g.beginFill(0xd35400, 1);
	this.g.drawCircle(self.px + Math.cos(Math.cos(40) * self.t.time / 350) * -70, self.py + Math.sin(Math.sin(40) * self.t.time / 350) * -70, 10);
	this.g.beginFill(0x8e44ad, 1);
	this.g.drawCircle(self.px + Math.cos(Math.cos(60) * self.t.time / 375) * -60, self.py + Math.sin(Math.sin(60) * self.t.time / 375) * -60, 5);
	this.g.beginFill(0xf39c12, 1);
	this.g.drawCircle(self.px + Math.cos(Math.cos(80) * self.t.time / 400) * -50, self.py + Math.sin(Math.sin(80) * self.t.time / 400) * -50, 25);
	this.g.endFill();*/

	self.renderer.render(self.stage);
}

Circuitry.prototype.bindKeys = function()
{
	window.addEventListener('keypress', this.events.keypress);
}