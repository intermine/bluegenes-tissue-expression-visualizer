function ExpressionModel(type, color, range) {
	return { type, color, range };
}

const Expressions = {
	'No / Extremely low expression': ExpressionModel(0, '#FFF', '0 to 10'),
	'Very low expression': ExpressionModel(4, '#D9C5E9', '11 to 100'),
	'Low expression': ExpressionModel(6, '#C8ABDF', '101 to 400'),
	'Moderate expression': ExpressionModel(8, '#B48FD4', '401 to 1400'),
	'Moderately high expression': ExpressionModel(11, '#A373CA', '1401 to 4000')
};

function getChartData(results) {
	const chartData = {
		expressionTypes: [],
		stageNames: [],
		colors: [],
		hoverTexts: []
	};

	results.sort((s1, s2) => {
		let valA = s1.stage.toUpperCase();
		let valB = s2.stage.toUpperCase();
		return valA < valB ? -1 : valA > valB ? 1 : 0;
	});

	results.forEach(result => {
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
