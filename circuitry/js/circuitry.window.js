function CWindow(stage, x, y, width, height, title, contentscript, closebutton)
{
	this.stage = stage;

	console.log(x, y, width, height);

	this.x = x;
	this.y = y;
	this.width = width || 400;
	this.height = height || 300;

	this.title = title || "Anonymous window";

	this.contentscript = contentscript || function() {};

	this.closebutton = closebutton;

	this.visible = true;
	this.isopen = false;

	this.g = new PIXI.Graphics();
	this.stage.addChild(this.g);

	this.style = 
	{
	    font : '14px Arial',
	    fill : '#FFFFFF',
	    stroke : '#000000',
	    strokeThickness : 0
	};

	this.titleg = new PIXI.Text(this.title, this.style)
	this.stage.addChild(this.titleg);
}

CWindow.prototype.update = function(dt, time)
{
	this.titleg.x = this.x + 5;
	this.titleg.y = this.y + this.titleg.height / 2;
}

CWindow.prototype.draw = function(dt)
{
	this.g.clear();

	// Draw window
	this.g.lineStyle(2, 0x000000, 1);
	this.g.beginFill(0x34495e, 0.95);
	this.g.drawRect(this.x, this.y, this.width, this.height);

	// Draw titlebar
	this.g.lineStyle(2, 0x000000, 1);
	this.g.beginFill(0x2c3e50, 0.95);
	this.g.drawRect(this.x, this.y, this.width, 30);

	// Draw close button
	if(this.closebutton)
	{
		this.g.lineStyle(2, 0x000000, 1);
		this.g.beginFill(0xc0392b, 0.95);
		this.g.drawRect(this.x + this.width - 30, this.y, 30, 30);

		this.g.lineStyle(2, 0xFFFFFF, 1);
		this.g.moveTo(this.x + this.width - 22.5, this.y + 7.5);
		this.g.lineTo(this.x + this.width - 7.5, this.y + 22.5);

		this.g.lineStyle(2, 0xFFFFFF, 1);
		this.g.moveTo(this.x + this.width - 7.5, this.y + 7.5);
		this.g.lineTo(this.x + this.width - 22.5, this.y + 22.5);
	}

	// Draw content with contentscript
	this.contentscript(this);

	this.g.endFill();
}

CWindow.prototype.show = function()
{
	this.visible = true;
}

CWindow.prototype.hide = function()
{
	this.visible = false;
}