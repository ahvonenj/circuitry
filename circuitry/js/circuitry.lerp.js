var CLerp = 
{
	time: 0, // Program / game elapsed time
	lerps: [],

	doLerp: function(v0, v1, t, f, id)
	{
		var self = this;

		var id = id || null;

		this.lerps.push(
		{
			v0: v0,
			v1: v1,
			t: t,
			st: self.time,
			f: f,
			id: id
		});
	},

	updateOngoingLerps: function()
	{
		var self = this;

		for(var i = 0; i < this.lerps.length; i++)
		{
			var lerp = this.lerps[i];
			var ct = Math.min((self.time - lerp.st) / lerp.t, 1);
			var lr = self._lerp2(lerp.v0, lerp.v1, ct);

			lerp.f(lr);

			if(ct >= 1)
			{
				console.log(ct, lr)
				self.lerps.splice(i, 1);
				continue;
			}

			
		}
	},

	interrupt: function(lerptointerrupt)
	{
		for(var i = 0; i < this.lerps.length; i++)
		{
			var lerp = this.lerps[i];

			if(lerp.id !== null && lerp.id === lerptointerrupt)
			{
				this.lerps.splice(i, 1);
				console.log('INTERRUPTED ' + lerptointerrupt);
				break;
			}
			else
			{
				continue;
			}
		}
	},

	_lerp: function(v0, v1, t) 
	{
		return v0 + t * (v1 - v0);
	},

	// Accurate
	_lerp2: function(v0, v1, t) 
	{
  		return (1 - t) * v0 + t * v1;
	}
}