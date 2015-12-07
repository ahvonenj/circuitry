function CEvents(circuitry)
{
	this.circuitry = circuitry;
}

CEvents.prototype.keypress = function(e)
{
	var self = this;

	//k = this.circuitry.t.time
	//this.circuitry.testwindow.x = CUtils.lerp(this.circuitry.testwindow.x, 300, (this.circuitry.t.time - k);
	
	CLerp.doLerp(this.circuitry.testwindow.x, 300, 500, function(l)
	{
		self.circuitry.testwindow.x = l;
	});
	//console.log(CUtils.lerp2(this.circuitry.testwindow.x, 300, 5));
}