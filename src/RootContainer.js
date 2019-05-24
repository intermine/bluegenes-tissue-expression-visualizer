import React from 'react';
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
			// console.log(enrichments);
		});
		// .catch(console.error);
	}

	render() {
		return (
			<div className="rootContainer">
				<div className="firstGraph">
					<div className="graph">
						<h1>First Graph</h1>
					</div>
					<div className="controls">
						<span>Controls</span>
					</div>
				</div>
				<div className="secondGraph">
					<div className="graph">
						<h1>Second Graph</h1>
					</div>
					<div className="controls">
						<span>Controls</span>
					</div>
				</div>
			</div>
		);
	}
}

export default RootContainer;
