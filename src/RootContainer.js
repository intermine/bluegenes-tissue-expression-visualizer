import React from 'react';
import queryOrganism from './common/queryOrganism';
import Loader from './common/loader';
import {
	chart as TissueExpChart,
	controls as TissueExpChartControls,
	queryData as queryTissueExpData,
	getChartData as getTissueExpChartData
} from './tissueExpression';
import {
	chart as StageExpressionChart,
	queryData as queryStageExpression,
	getChartData as getStageExpressionChartData
} from './stageExpression';

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
		// when testing via jest, don't do all the calcs
		if (this.props.testing) return;

		if (!this.props.entity || !this.props.serviceUrl)
			throw new Error('No `entity` or `serviceUrl` passed as prop');

		const {
			entity: { value: geneId },
			serviceUrl
		} = this.props;

		// query for organism name once
		queryOrganism(geneId, serviceUrl).then(orgName => {
			// fetch data for tissue expression chart
			queryTissueExpData(geneId, orgName, serviceUrl).then(res => {
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

			// fetch data for expression by stage graph
			queryStageExpression(geneId, orgName, serviceUrl).then(res => {
				const results = res.rnaSeqResults;
				const chartData = getStageExpressionChartData(results);
				this.setState({ stageExpressionChartData: chartData });
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
							<TissueExpChartControls
								controlOptions={this.state.tissueExpOptions}
								changeOptions={this.changeOptions}
							/>
						</>
					) : (
						<Loader />
					)}
				</div>
				<div className="secondGraph">
					{this.state.stageExpressionChartData ? (
						<StageExpressionChart
							chartData={this.state.stageExpressionChartData}
						/>
					) : (
						<Loader />
					)}
				</div>
			</div>
		);
	}
}

export default RootContainer;
