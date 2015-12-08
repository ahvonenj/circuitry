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
	},

	getQueryVariable: function(variable)
	{
	       var query = window.location.search.substring(1);
	       var vars = query.split("&");

	       for (var i=0;i<vars.length;i++) 
	       {
	               var pair = vars[i].split("=");
	               if(pair[0] == variable){return pair[1];}
	       }

	       return(false);
	}
}