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
			var lr = self._easeOutQuart(lerp.v0, lerp.v1, ct);

			lerp.f(lr);

			if(ct >= 1)
			{
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
	},

	_easeInQuad: function (v0, v1, t) 
	{ 
		return t*t; 
	},

	// decelerating to zero velocity
	_easeOutQuad: function (v0, v1, t) 
	{ 
		return t*(2-t); 
	},

	// acceleration until halfway, then deceleration
	_easeInOutQuad: function (v0, v1, t) 
	{ 
		return t<.5 ? 2*t*t : -1+(4-2*t)*t; 
	},

	// accelerating from zero velocity 
	_easeInCubic: function (v0, v1, t) 
	{ 
		return t*t*t; 
	},

	// decelerating to zero velocity 
	_easeOutCubic: function (v0, v1, t) 
	{ 
		return (--t)*t*t+1;
	},

	// acceleration until halfway, then deceleration 
	_easeInOutCubic: function (v0, v1, t) 
	{ 
		return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; 
	},

	// accelerating from zero velocity 
	_easeInQuart: function (v0, v1, t) 
	{ 
		return t*t*t*t; 
	},

	// decelerating to zero velocity 
	_easeOutQuart: function (v0, v1, t) 
	{
    	return (v1 - v0) * (1-(--t)*t*t*t) + v0;
	},

	// acceleration until halfway, then deceleration
	_easeInOutQuart: function (v0, v1, t) 
	{ 
		return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; 
	},

	// accelerating from zero velocity
	_easeInQuint: function (v0, v1, t) 
	{ 
		return t*t*t*t*t; 
	},

	// decelerating to zero velocity
	_easeOutQuint: function (v0, v1, t) 
	{ 
		return 1+(--t)*t*t*t*t;
	},

	// acceleration until halfway, then deceleration 
	_easeInOutQuint: function (v0, v1, t) 
	{ 
		return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t ;
	}
}