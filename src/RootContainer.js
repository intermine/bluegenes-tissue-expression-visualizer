import React from 'react';
import {
	queryData as queryTissueExpData,
	renderChart as renderTissueExpChart,
	controls as TissueExpChartControls
} from './tissueExpression';

class RootContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tissueExpData: null,
			tissueExpOptions: {
				sort: 'name',
				scale: 'log',
				val: 'enrichment'
			}
		};
		this.changeOptions = this.changeOptions.bind(this);
	}

	componentDidMount() {
		const {
			entity: { value: geneId },
			serviceUrl
		} = this.props;
		queryTissueExpData(geneId, serviceUrl).then(res => {
			const results = res.microArrayResults;
			this.setState({ tissueExpData: results }, () => {
				// render graph when `canvas` is rendered
				renderTissueExpChart(
					this.firstGraph,
					results,
					this.state.tissueExpOptions
				);
			});
		});
	}

	changeOptions() {
		// const { name, checked, value } = ev.target;
		// console.log(name, checked, value);
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
					<TissueExpChartControls changeOptions={this.changeOptions} />
				</div>
				<div className="secondGraph">
					<canvas className="graph" />
				</div>
			</div>
		);
	}
}

export default RootContainer;
