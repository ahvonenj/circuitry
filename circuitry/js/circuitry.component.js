function CComponent(x, y, type, color, circuitryref, test)
{
	var self = this;

	this.circuitryref = circuitryref;
	this.events = this.circuitryref.events;

	this.type = type;
	this.color = color;

	this.startx = x;
	this.starty = y;

	this.dragstartx = null;
	this.dragstarty = null;

	this.test = test;

	this.gridcellsize = 
	{
		w: this.circuitryref.grid.wx,
		h: this.circuitryref.grid.wy
	}

	this.x = x * this.gridcellsize.w;
	this.y = y * this.gridcellsize.h;

	this.g = new PIXI.Graphics();

	this.init();

	this.t = this.g.generateTexture();
	this.p = new PIXI.Sprite(this.t);
	this.circuitryref.stage.addChild(this.p);

	this.p.interactive = true;

	this.p.mousedown = function(e)
	{
		if(self.events.draggedobject === null)
		{
			self.events.draggedobject = self;
			self.dragstartx = self.circuitryref.interaction.mouse.global.x - self.x;
			self.dragstarty = self.circuitryref.interaction.mouse.global.y - self.y;
		}
	}
}

CComponent.prototype.update = function(dt, t)
{
	var self = this;
	//this.x = Math.floor((this.startx * this.gridcellsize.w + Math.cos(t / this.test) * 20 * this.gridcellsize.w) / this.gridcellsize.w) * this.gridcellsize.w;
	//this.y = Math.floor((this.starty * this.gridcellsize.h + Math.sin(t / this.test) * 20 * this.gridcellsize.h) / this.gridcellsize.h) * this.gridcellsize.h;

	this.p.position.x = this.x;
	this.p.position.y = this.y;

	//console.log(this.x, this.y);
}

CComponent.prototype.init = function()
{
	var self = this;

	self.g.clear();
	self.g.lineStyle(2, 0x000000, 1);
	self.g.beginFill(self.color, 1);

	for(var y = 0; y < this.type.gridmodel.length; y++)
	{
		for(var x = 0; x < this.type.gridmodel[y].length; x++)
		{
			var modelcell = this.type.gridmodel[y][x];

			if(modelcell === 1)
			{
				self.g.drawRect(self.x + x * self.gridcellsize.w, self.y + y * self.gridcellsize.h, self.gridcellsize.w, self.gridcellsize.h);
			}
		}
	}

	self.g.endFill();
}

CComponent.prototype.draw = function()
{
	
}

CComponent.prototype.tick = function()
{
	
}

CComponent.prototype.isOutOfBounds = function()
{
	var self = this;

	for(var y = 0; y < this.type.gridmodel.length; y++)
	{
		for(var x = 0; x < this.type.gridmodel[y].length; x++)
		{
			var modelcell = this.type.gridmodel[y][x];

			if(modelcell === 1)
			{
				var realx = self.x + x * self.gridcellsize.w;
				var realy = self.y + y * self.gridcellsize.h;

				if(realx < 0 || realx > self.circuitryref.grid.wx ||
					realy < 0 || realy > selfcircuitryref.grid.wy)
				{
					return true;
				}
			}
		}
	}

	return false;
}