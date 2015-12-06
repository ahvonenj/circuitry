function CGrid(rx, ry, $container, stage, renderer)
{
	var self = this;

	this.$container = $container;
	this.stage = stage;


	this.rx = rx || 50;
	this.ry = ry || 50;

	this.wx = this.$container.width() / this.rx;
	this.wy = this.$container.height() / this.ry;

	this.g = new PIXI.Graphics();
	this.stage.addChild(this.g);

	this.selected = null;
}

CGrid.prototype.update = function(dt, interaction)
{
	var self = this;

	var mx = interaction.mouse.global.x;
	var my = interaction.mouse.global.y;

	if(mx > 0 && my > 0)
	{
		self.selected = 
		{
			x: Math.floor(mx / this.wx),
			y: Math.floor(my / this.wy)
		}
	}
	else
	{
		self.selected = null;
	}
}

CGrid.prototype.draw = function(dt)
{
	var self = this;

	self.g.clear();

	for(var y = 0; y < self.ry; y++)
	{
		for(var x = 0; x < self.rx; x++)
		{
			self.g.lineStyle(1, 0x000000, 0.45);

			if(self.selected !== null && self.selected.x === x && self.selected.y === y)
			{
				self.g.beginFill(0x27a762, 1);
			}
			else
			{
				self.g.beginFill(0x1E824C, 1);
			}

			self.g.drawRect(self.wx * x, self.wy * y, self.wx, self.wy);
		}
	}

	self.g.endFill();
}