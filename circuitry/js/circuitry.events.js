function CEvents(circuitry)
{
	this.circuitry = circuitry;
}

CEvents.prototype.keypress = function(e)
{
	var self = this;
	var key = String.fromCharCode(event.keyCode).toLowerCase(); // Evaluate keycode into a lowercase human-readable letter

	switch(key)
	{
		case 'e':
			if(!self.circuitry.componentwindow.isopen)
			{
				self.circuitry.componentwindow.isopen = true;

				CLerp.doLerp(self.circuitry.componentwindow.x, self.circuitry._WZ.w - self.circuitry.componentwindow.width, 350, function(l)
				{
					self.circuitry.componentwindow.x = l;
				});
			}
			else
			{
				self.circuitry.componentwindow.isopen = false;
				
				CLerp.doLerp(self.circuitry.componentwindow.x, self.circuitry._WZ.w, 350, function(l)
				{
					self.circuitry.componentwindow.x = l;
				});
			}
			break;
		default:
			break;
	}
}