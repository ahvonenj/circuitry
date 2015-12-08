function CEvents(circuitry)
{
	this.circuitry = circuitry;
}

CEvents.prototype.keypress = function(e)
{
	var self = this;
	var key = String.fromCharCode(e.charCode).toLowerCase(); // Evaluate keycode into a lowercase human-readable letter

	switch(key)
	{
		case 'e':
			if(!self.circuitry.componentwindow.isopen)
			{
				self.circuitry.componentwindow.isopen = true;
				CLerp.interrupt('componentwindow_close');

				CLerp.doLerp(self.circuitry.componentwindow.x, self.circuitry._WZ.w - self.circuitry.componentwindow.width, 350, function(l)
				{
					self.circuitry.componentwindow.x = l;
				}, 'componentwindow_open');
			}
			else
			{
				self.circuitry.componentwindow.isopen = false;
				CLerp.interrupt('componentwindow_open');

				CLerp.doLerp(self.circuitry.componentwindow.x, self.circuitry._WZ.w, 350, function(l)
				{
					self.circuitry.componentwindow.x = l;
				}, 'componentwindow_close');
			}
			break;
		case 'h':
			if(typeof self.circuitry.keyText.shown === 'undefined' || self.circuitry.keyText.shown === true)
			{
				self.circuitry.keyText.shown = false;
				CLerp.interrupt('show_helptex');

				CLerp.doLerp(self.circuitry.keyText.alpha, 0, 250, function(l)
				{
					self.circuitry.keyText.alpha = l;
				}, 'hide_helptext');
			}
			else
			{
				self.circuitry.keyText.shown = true;
				CLerp.interrupt('hide_helptext');

				CLerp.doLerp(self.circuitry.keyText.alpha, 1, 250, function(l)
				{
					self.circuitry.keyText.alpha = l;
				}, 'show_helptext');
			}
				
			
			break;
		default:
			break;
	}
}