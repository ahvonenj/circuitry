var CUtils = 
{
	timestamp: function()
	{
  		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	},

	lerp: function(v0, v1, t) 
	{
  		return (1 - t) * v0 + t * v1;
	},

	lerp2: function(v0, v1, t) 
	{
		return v0 + t * (v1 - v0);
	}
}