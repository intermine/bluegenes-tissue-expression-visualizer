function ExpressionModel(type, color, range) {
	return { type, color, range };
}

const Expressions = {
	'No / Extremely low expression': ExpressionModel(0, '#FFF', '0 to 10'),
	'Very low expression': ExpressionModel(1, '#D9C5E9', '11 to 100'),
	'Low expression': ExpressionModel(2, '#BA9FBE', '101 to 400'),
	'Moderate expression': ExpressionModel(3, '#B48FD4', '401 to 1400'),
	'Moderately high expression': ExpressionModel(4, '#A373CA', '1401 to 4000')
};

function getChartData(results) {
	const chartData = {
		expressionTypes: [],
		stageNames: [],
		colors: [],
		hoverTexts: []
	};

	results.forEach(result => {
		// scale value acc to dataOptions - log / linear

		chartData.stageNames.push(result.stage);
		chartData.hoverTexts.push(
			`${result.expressionLevel}: ${Expressions[result.expressionLevel].range}`
		);
		chartData.expressionTypes.push(Expressions[result.expressionLevel].type);
		chartData.colors.push(Expressions[result.expressionLevel].color);
	});

	return chartData;
}

export default getChartData;
