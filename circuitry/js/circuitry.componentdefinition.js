var CComponentDefinition = 
{
	Generator:
	{
		smallgenerator:
		{
			id: 'generator_small',

			gridmodel:
			[
				[1, 1, 0, 0, 0],
				[1, 1, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			]
		},

		mediumgenerator:
		{
			id: 'generator_medium',

			gridmodel:
			[
				[1, 1, 0, 0, 0],
				[1, 1, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			]
		},

		biggenerator:
		{
			id: 'generator_big',

			gridmodel:
			[
				[1, 1, 1, 0, 0],
				[1, 1, 1, 0, 0],
				[1, 1, 1, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			]
		}
	},

	Logic:
	{

	},

	Output:
	{

	}
}

/*

setInterval(function()
{
	for(var k in circuitry.testcomponents)
	{
		var m = circuitry.testcomponents[k].type.gridmodel;

		for(var y = 0; y < m.length; y++)
		{
			for(var x = 0; x < m[y].length; x++)
			{
				var idx = m[y][x];

				circuitry.testcomponents[k].type.gridmodel[y][x] = (idx === 1) ? 0 : 1;
			}
		}
	}
}, 500);


*/