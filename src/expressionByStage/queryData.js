const geneToExpressionQuery = ({ geneId, orgName }) => ({
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

function queryData(geneId, orgName, serviceUrl) {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line
		const service = new imjs.Service({ root: serviceUrl });
		service
			.records(geneToExpressionQuery({ geneId, orgName }))
			.then(data => resolve(data[0]))
			.catch(reject);
	});
}

export default queryData;
