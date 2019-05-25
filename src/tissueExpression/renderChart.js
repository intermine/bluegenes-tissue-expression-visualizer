import Chart from 'chart.js/dist/Chart.min.js';

function getChartData(results) {
	// sort according to tissue name by default
	results.sort((r1, r2) => {
		const textA = r1.tissue.name.toUpperCase();
		const textB = r2.tissue.name.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});

	const chartData = {
		enrichments: [],
		tissueNames: [],
		colors: [],
		hoverTexts: []
	};

	results.forEach(result => {
		chartData.enrichments.push(Math.log2(Number(result.enrichment)));
		chartData.tissueNames.push(result.tissue.name);

		// get color for this enrichment
		let color = '';
		if (!result.affyCall || result.affyCall === 'None') color = '#7E3CB5';
		else if (result.affyCall == 'Up') color = '#AD3E61';
		else color = '#344DB5';
		chartData.colors.push(color);

		// get hover text for this tissue bar
		let regulationText = 'Same as Whole Fly';
		if (result.affCall === 'Up') regulationText = 'Up Regulated';
		else if (result.affCall === 'Down') regulationText = 'Down Regulated';
		regulationText = `${regulationText}: (signal: ${
			result.mRNASignal
		}, enrichment: ${result.enrichment})`;
		chartData.hoverTexts.push(regulationText);
	});

	return chartData;
}

function renderChart(el, results) {
	const chartData = getChartData(results);
	new Chart(el, {
		type: 'horizontalBar',
		data: {
			labels: chartData.tissueNames,
			datasets: [
				{
					label: [],
					data: chartData.enrichments,
					backgroundColor: chartData.colors,
					borderWidth: 2
				}
			]
		},
		options: {
			title: {
				text: 'Expression by Tissue',
				display: true,
				fontSize: 18,
				position: 'top',
				fontStyle: 'bold',
				fontColor: '#000'
			},
			legend: {
				position: 'right',
				labels: {
					// returns legends shown at the side
					generateLabels() {
						return [
							{
								text: 'Down Regulated',
								fillStyle: '#344DB5',
								strokeStyle: '#344DB5',
								lineWidth: 1,
								hidden: false,
								index: 0
							},
							{
								text: 'Same as whole fly',
								fillStyle: '#7E3CB5',
								strokeStyle: '#7E3CB5',
								lineWidth: 1,
								hidden: false,
								index: 1
							},
							{
								text: 'Up Regulated',
								fillStyle: '#AD3E61',
								strokeStyle: '#AD3E61',
								lineWidth: 1,
								hidden: false,
								index: 1
							}
						];
					}
				},
				// define onClick to just override default onClick
				onClick() {},
				// highlight that particular set of data on hover
				onHover(ev, label) {
					const dataset = this.chart.data.datasets[0];
					dataset.borderColor = dataset.backgroundColor.map(color => {
						return label.fillStyle === color ? color : '#ffffff';
					});
					this.chart.update();
				},
				// on hover out, make everyone equal in highlight removing all borders
				onLeave() {
					this.chart.data.datasets[0].borderColor = [];
					this.chart.update();
				}
			},
			tooltips: {
				callbacks: {
					label(tooltipItem) {
						return chartData.hoverTexts[tooltipItem.index];
					}
				},
				backgroundColor: '#ffffff',
				bodyFontColor: '#000000',
				titleFontColor: '#000000',
				titleFontSize: 16,
				bodyFontSize: 14,
				borderColor: '#dadada',
				borderWidth: 1
			},
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Tissue Name',
							fontSize: 16,
							fontStyle: 'italic',
							fontColor: '#000'
						}
					}
				],
				xAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Enrichment log ( ² )',
							fontSize: 16,
							fontStyle: 'italic',
							fontColor: '#000'
						}
					}
				]
			}
		}
	});
}

export default renderChart;
