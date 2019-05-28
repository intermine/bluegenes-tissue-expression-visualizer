function getChartData(results, dataOptions) {
	const { sort, scale } = dataOptions;
	// sort according to tissue name by default
	results.sort((r1, r2) => {
		let valA, valB;
		if (sort === 'name') {
			valA = r1.tissue.name.toUpperCase();
			valB = r2.tissue.name.toUpperCase();
		} else {
			valA = r1.mRNASignal;
			valB = r2.mRNASignal;
		}
		return valA < valB ? -1 : valA > valB ? 1 : 0;
	});

	const chartData = {
		enrichments: [],
		signalValues: [],
		tissueNames: [],
		colors: [],
		hoverTexts: []
	};

	results.forEach(result => {
		// scale value acc to dataOptions - log / linear
		const scaleVal = n => (scale === 'log' ? Math.log2(n) : n);
		chartData.enrichments.push(scaleVal(Number(result.enrichment)));
		chartData.signalValues.push(scaleVal(Number(result.mRNASignal)));
		chartData.tissueNames.push(result.tissue.name);

		// get color for this enrichment
		let color = '';
		if (!result.affyCall || result.affyCall === 'None') color = '#7E3CB5';
		else if (result.affyCall == 'Up') color = '#AD3E61';
		else color = '#344DB5';
		chartData.colors.push(color);

		// get hover text for this tissue bar
		let regulationText = 'Same as Whole Fly';
		if (result.affyCall === 'Up') regulationText = 'Up Regulated';
		else if (result.affyCall === 'Down') regulationText = 'Down Regulated';
		regulationText = `${regulationText}: (signal: ${
			result.mRNASignal
		}, enrichment: ${result.enrichment})`;
		chartData.hoverTexts.push(regulationText);
	});

	return chartData;
}

export default getChartData;
