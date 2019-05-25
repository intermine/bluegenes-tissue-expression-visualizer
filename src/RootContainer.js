import React from 'react';
import {
	queryData as queryTissueExpData,
	renderChart as renderTissueExpChart
} from './tissueExpression';

class RootContainer extends React.Component {
	componentDidMount() {
		const {
			entity: { value: geneId },
			serviceUrl
		} = this.props;
		queryTissueExpData(geneId, serviceUrl).then(res => {
			const results = res.microArrayResults;
			renderTissueExpChart(this.firstGraph, results);
		});
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
