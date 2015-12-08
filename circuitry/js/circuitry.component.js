function CComponent(x, y, type, color, circuitryref, test)
{
	var self = this;

	this.circuitryref = circuitryref;

	this.type = type;
	this.color = color;

	this.startx = x;
	this.starty = y;

	this.test = test;

	this.gridcellsize = 
	{
		w: this.circuitryref.grid.wx,
		h: this.circuitryref.grid.wy
	}

	this.x = x * this.gridcellsize.w;
	this.y = y * this.gridcellsize.h;

	this.g = new PIXI.Graphics();
	this.circuitryref.stage.addChild(this.g);
}

CComponent.prototype.update = function(dt, t)
{
	this.x = Math.floor((this.startx * this.gridcellsize.w + Math.cos(t / this.test) * 20 * this.gridcellsize.w) / this.gridcellsize.w) * this.gridcellsize.w;
	this.y = Math.floor((this.starty * this.gridcellsize.h + Math.sin(t / this.test) * 20 * this.gridcellsize.h) / this.gridcellsize.h) * this.gridcellsize.h;

	//console.log(this.x, this.y);
}

CComponent.prototype.draw = function()
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

	//self.g.drawRect(self.x, self.y, self.gridcellsize.w, self.gridcellsize.h);

	

	self.g.endFill();
}

CComponent.prototype.tick = function()
{
	
}