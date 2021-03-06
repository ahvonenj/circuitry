function Circuitry($container, gridwidth, gridheight)
{
	var self = this;

	if(typeof $container === 'undefined' || !$container || $container.length === 0)
	{
		throw new Error('Circuitry could not initialize ($container is falsy)');
		return false;
	}

	this.debug = false;
	this.version = '0.1';

	this.$container = $container;

	this._WZ =
	{
		w: this.$container.width(),
		h: this.$container.height()
	}

	this.gridwidth = gridwidth || 80;
	this.gridheight = gridheight || 80;

	this.renderer = new PIXI.WebGLRenderer(this._WZ.w, this._WZ.h,
	{
		backgroundColor: 0x1E824C,
		antialias: false,
		autoResize: true
	});

	this.$container.append(this.renderer.view);

	this.stage = new PIXI.Container();


	// INTERACTION
	this.interaction = this.renderer.plugins.interaction;
	this.events = new CEvents(this);
	this.bindKeys();


	// INIT COMPONENT GRID
	this.grid = new CGrid(this.gridwidth, this.gridheight, this.$container, this.stage);


	this.testcomponents =
	[
		new CComponent(20, 20, CComponentDefinition.Generator.tinygenerator, 0xFFFF00, self, 600),
		new CComponent(30, 30, CComponentDefinition.Generator.smallgenerator, 0x0000FF, self, 600),
		new CComponent(40, 40, CComponentDefinition.Generator.mediumgenerator, 0x00FF00, self, 900),
		new CComponent(50, 50, CComponentDefinition.Generator.biggenerator, 0xFF0000, self, 1200)
	]


	// INIT CIRCUITRY LOGO THING
	this.g = new PIXI.Graphics();
	this.stage.addChild(this.g);

	this.px = 100;
	this.py = 100;


	// BUBBLEGUM
	self.doShamefulStuff();


	// INIT COMPONENT WINDOW
	this.componentwindow = new CWindow(this.stage, this._WZ.w, 0, 400, this._WZ.h, "Circuitry component window", function(w) 
	{ 
		w.g.drawRect(w.x + 50, w.y + 50, 60, 50);
	}, false);


	// Z SWAP
	//this.stage.swapChildren(this.g, this.grid.g);
	//this.stage.swapChildren(this.componentwindow.g, this.richText);


	// TIMING
	this.t = 
	{
		now: null,
		dt: 0,
		last: CUtils.timestamp(),
		step: 1/60,
		time: 0
	}

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
	CLerp.time = self.t.time;

	self.t.last = self.t.now; 
	requestAnimationFrame(this.step.bind(self));
}

Circuitry.prototype.update = function(dt)
{
	var self = this;

	CLerp.updateOngoingLerps(dt);

	this.grid.update(dt, this.interaction);
	this.componentwindow.update(dt, self.t.time);

	this.events.handleInput();

	self.testcomponents.forEach(function(v, i)
	{
		v.update(dt, self.t.time);
	});		
}

Circuitry.prototype.render = function(dt)
{
	var self = this;

	this.grid.draw(dt);
	this.componentwindow.draw(dt);


	if(self.debug)
	{
		self.px = self._WZ.w / 2 + Math.cos(self.t.time / 300) * 300;
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
		this.g.endFill();
	}

	self.testcomponents.forEach(function(v, i)
	{
		v.draw();
	});		

	self.renderer.render(self.stage);
}

Circuitry.prototype.bindKeys = function()
{
	window.addEventListener('keypress', this.events.keypress.bind(this.events));
	window.addEventListener('mouseup', this.events.mouseup.bind(this.events));
	window.addEventListener('mousedown', this.events.mousedown.bind(this.events));
	//window.addEventListener('keypress', this.events.keypress);
}

Circuitry.prototype.doShamefulStuff = function()
{
	var self = this;

	var st = 
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

	self.richText = new PIXI.Text('circuitry', st);
	self.richText.x = self._WZ.w / 2 - self.richText.width / 2;
	self.richText.y = self._WZ.h / 2 - self.richText.height / 2;

	if(self.debug)
		self.stage.addChild(self.richText);

	st = 
	{
	    font : 'bold 14px Arial',
	    fill : '#FFFFFF',
	    stroke : '#000000',
	    strokeThickness : 2
	};

	self.keyText = new PIXI.Text('circuitry v' + self.version + '\n\n' +
								'E - toggle component window\n' +
								'H - toggle this text', st);
	self.keyText.x = 5;
	self.keyText.y = 5;

	self.stage.addChild(self.keyText);
}