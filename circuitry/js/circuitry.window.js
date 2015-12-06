function CWindow(stage, x, y, width, height, title, contentscript)
{
	this.stage = stage;

	this.x = x || 100;
	this.y = y || 100;
	this.width = width || 400;
	this.height = height || 300;

	this.title = title || "Anonymous window";

	this.contentscript = contentscript || function(g) {};

	this.visible = true;

	this.g = new PIXI.Graphics();
	this.stage.addChild(this.g);
}

CWindow.prototype.update = function(dt, time)
{
	this.width = 400 + Math.cos(time / 300) * 100;
	this.height = 400 + Math.sin(time / 300) * 100;
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

	// Draw titlebar
	this.g.lineStyle(2, 0x000000, 1);
	this.g.beginFill(0xc0392b, 0.95);
	this.g.drawRect(this.x + this.width - 30, this.y, 30, 30);

	this.g.lineStyle(2, 0xFFFFFF, 1);
	this.g.moveTo(this.x + this.width - 22.5, this.y + 7.5);
	this.g.lineTo(this.x + this.width - 7.5, this.y + 22.5);

	this.g.lineStyle(2, 0xFFFFFF, 1);
	this.g.moveTo(this.x + this.width - 7.5, this.y + 7.5);
	this.g.lineTo(this.x + this.width - 22.5, this.y + 22.5);




	this.contentscript(this.g);

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