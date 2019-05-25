import React from 'react';
import renderTissueExpressionChart from './renderTissueExpressionChart';
import { queryData } from './queryData';

const getColor = affyCall => {
	if (!affyCall || affyCall === 'None') return '#7E3CB5';
	else if (affyCall == 'Up') return '#AD3E61';
	return '#344DB5';
};

class RootContainer extends React.Component {
	componentDidMount() {
		const {
			entity: { value: geneId },
			serviceUrl
		} = this.props;
		queryData(geneId, serviceUrl).then(res => {
			const results = res.microArrayResults;
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
				chartData.colors.push(getColor(result.affyCall));
			});

			// console.log(chartData);

			renderTissueExpressionChart(this.firstGraph, chartData);
		});
		// .catch(console.error);
	}

	render() {
		return (
			<div className="rootContainer">
				<div className="firstGraph">
					<canvas
						className="graph"
						ref={r => {
							this.firstGraph = r;
						}}
					/>
					<div className="controls">
						<span>Controls</span>
					</div>
				</div>
				<div className="secondGraph">
					<canvas className="graph" />
					<div className="controls">
						<span>Controls</span>
					</div>
				</div>
			</div>
		);
	}
}

export default RootContainer;
