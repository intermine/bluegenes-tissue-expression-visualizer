import React from 'react';
import { queryData } from './queryData';

class RootContainer extends React.Component {
	componentDidMount() {
		const {
			entity: { value: geneId },
			serviceUrl
		} = this.props;
		queryData(geneId, serviceUrl);
	}

	render() {
		return (
			<div className="rootContainer">
				<h1>Your Data Viz Here</h1>
			</div>
		);
	}
}

export default RootContainer;
