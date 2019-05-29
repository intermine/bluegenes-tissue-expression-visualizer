const stageExpressionQuery = ({ geneId, orgName }) => ({
	from: 'Gene',
	select: [
		'primaryIdentifier',
		'symbol',
		'rnaSeqResults.stage',
		'rnaSeqResults.expressionScore',
		'rnaSeqResults.expressionLevel'
	],
	orderBy: [
		{
			path: 'rnaSeqResults.stage',
			direction: 'ASC'
		}
	],
	where: [
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
			.records(stageExpressionQuery({ geneId, orgName }))
			.then(data => {
				if (data && data.length) resolve(data[0]);
				else reject('No data found!');
			})
			.catch(reject);
	});
}

export default queryData;
