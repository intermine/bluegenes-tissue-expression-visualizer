import React from 'react';
import {
	chart as TissueExpChart,
	controls as TissueExpChartControls,
	queryData as queryTissueExpData,
	getChartData as getTissueExpChartData
} from './tissueExpression';

class RootContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tissueExpData: null,
			tissueExpChartData: null,
			tissueExpOptions: {
				sort: 'name', // name or signal
				scale: 'log', // log or linear
				val: 'enrichment' // enrichment or signal
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
			const chartData = getTissueExpChartData(
				results,
				this.state.tissueExpOptions
			);
			this.setState({
				tissueExpData: results,
				tissueExpChartData: chartData
			});
		});
	}

	changeOptions(ev) {
		const { name, value } = ev.target;
		const chartData = getTissueExpChartData(
			this.state.tissueExpData,
			Object.assign({}, this.state.tissueExpOptions, { [name]: value })
		);
		this.setState({
			tissueExpOptions: Object.assign({}, this.state.tissueExpOptions, {
				[name]: value
			}),
			tissueExpChartData: chartData
		});
	}

	render() {
		return (
			<div className="rootContainer">
				<div className="firstGraph">
					{this.state.tissueExpChartData ? (
						<>
							<TissueExpChart
								chartData={this.state.tissueExpChartData}
								dataOptions={this.state.tissueExpOptions}
							/>
							<TissueExpChartControls changeOptions={this.changeOptions} />
						</>
					) : (
						<div className="loading-container">
							<span className="loading" />
						</div>
					)}
				</div>
				<div className="secondGraph">
					<canvas className="graph" />
				</div>
			</div>
		);
	}
}

export default RootContainer;
