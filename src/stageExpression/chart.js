import React from 'react';
import Chart from 'chart.js';

class StageExpressionChart extends React.Component {
	componentDidMount() {
		const { chartData } = this.props;
		if (!chartData) return;
		this.chart = new Chart(this.graph, {
			type: 'horizontalBar',
			data: {
				labels: chartData.stageNames,
				datasets: [
					{
						label: [],
						data: chartData.expressionTypes,
						backgroundColor: chartData.colors,
						borderWidth: 1
					}
				]
			},
			options: {
				title: {
					text: 'Expression by Stage',
					display: true,
					fontSize: 18,
					position: 'top',
					fontStyle: 'bold',
					fontColor: '#000'
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
								labelString: 'Stage',
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

	render() {
		return (
			<canvas
				height="440px"
				className="graph"
				ref={r => {
					this.graph = r;
				}}
			/>
		);
	}
}

export default StageExpressionChart;
