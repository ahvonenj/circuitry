var circuitry;

$(document).ready(function()
{
	console.log('Circuitry init');

	if (!window.requestAnimationFrame) 
	{
		window.requestAnimationFrame = (function() 
		{
			return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame || // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback, element) 
			{
				window.setTimeout(callback, 1000 / 60);
			};
		})();
	}

	circuitry = new Circuitry($('#circ_container'));

});