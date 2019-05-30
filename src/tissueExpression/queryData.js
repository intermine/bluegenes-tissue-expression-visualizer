const geneToExpressionQuery = ({ geneId, orgName }) => ({
	from: 'Gene',
	select: [
		'secondaryIdentifier',
		'symbol',
		'microArrayResults.mRNASignal',
		'microArrayResults.mRNASignalSEM',
		'microArrayResults.presentCall',
		'microArrayResults.enrichment',
		'microArrayResults.affyCall',
		'microArrayResults.dataSets.name',
		'microArrayResults.tissue.name'
	],
	orderBy: [
		{
			path: 'secondaryIdentifier',
			direction: 'ASC'
		}
	],
	where: [
		{
			path: 'microArrayResults',
			type: 'FlyAtlasResult'
		},
		{
			path: 'organism.name',
			op: '=',
			value: orgName
		},
		{
			path: 'Gene.id',
			op: '=',
			value: geneId
		}
	]
});

// eslint-disable-next-line
function queryData(geneId, orgName, serviceUrl, imjsClient = imjs) {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line
		const service = new imjsClient.Service({ root: serviceUrl });
		service
			.records(geneToExpressionQuery({ geneId, orgName }))
			.then(data => {
				if (data && data.length) resolve(data[0]);
				else reject('No data found!');
			})
			.catch(reject);
	});
}

export default queryData;
