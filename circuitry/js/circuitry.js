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

	self.stage.addChild(self.richText);

	this.px = 100;
	this.py = 100;


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
	self.t.last = self.t.now; 
	requestAnimationFrame(this.step.bind(self));
}

Circuitry.prototype.update = function(dt)
{
	var self = this;

	self.px = self._WZ.w / 2 + Math.cos(self.t.time / 300) * 300;
	self.py = self._WZ.h / 2 + Math.sin(self.t.time / 300) * 300;

	self.g.clear();
	this.g.lineStyle(3, 0x000000, 1);
	this.g.beginFill(0xFF0000, 1);
	this.g.drawCircle(self.px, self.py, 20);
	this.g.endFill();
}

Circuitry.prototype.render = function(dt)
{
	var self = this;

	self.renderer.render(self.stage);
}