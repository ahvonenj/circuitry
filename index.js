var circuitry;

$(document).ready(function()
{
	console.log('Circuitry init');

	var gridh = CUtils.getQueryVariable(gridh);
	var gridw = CUtils.getQueryVariable(gridw);

	circuitry = new Circuitry($('#circ_container'), gridw, gridh);

});