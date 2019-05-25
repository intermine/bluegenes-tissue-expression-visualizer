import Chart from 'chart.js';

function renderTissueExpressionChart(el, chartData) {
	new Chart(el, {
		type: 'horizontalBar',
		data: {
			labels: chartData.tissueNames,
			datasets: [
				{
					label: [],
					data: chartData.enrichments,
					backgroundColor: chartData.colors
				}
			]
		},
		options: {
			title: {
				text: 'Expression by Tissue',
				display: true,
				fontSize: 18,
				position: 'top',
				fontStyle: 'bold'
			},
			legend: {
				position: 'right',
				labels: {
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
				}
				// onClick(ev, label) {
				// 	console.log(label);
				// }
			},
			scales: {
				yAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Tissue Name',
							fontSize: 16,
							fontStyle: 'italic'
						}
					}
				],
				xAxes: [
					{
						scaleLabel: {
							display: true,
							labelString: 'Enrichment log ( ² )',
							fontSize: 16,
							fontStyle: 'italic'
						}
					}
				]
			}
		}
	});
}

export default renderTissueExpressionChart;
