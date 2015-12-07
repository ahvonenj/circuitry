var CUtils = 
{
	timestamp: function()
	{
  		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	},

	sineBetween: function(min, max, t)
	{
	    var halfRange = (max - min) / 2;
	    return min + halfRange + Math.sin(t) * halfRange;
	},

	cosineBetween: function(min, max, t)
	{
	    var halfRange = (max - min) / 2;
	    return min + halfRange + Math.cos(t) * halfRange;
	}
}