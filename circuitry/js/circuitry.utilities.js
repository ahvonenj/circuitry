var CUtils = 
{
	timestamp: function()
	{
  		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	}
}