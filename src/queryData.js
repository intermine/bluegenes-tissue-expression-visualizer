const geneToOrgQuery = geneId => ({
	from: 'Gene',
	select: ['id', 'organism.name'],
	where: [
		{
			path: 'id',
			op: '=',
			value: geneId
		}
	]
});

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

function queryData(geneId, serviceUrl) {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line
		const service = new imjs.Service({ root: serviceUrl });
		service
			.records(geneToOrgQuery(geneId))
			.then(data => {
				if (data.length === 0) throw new Error('No organism associated!');
				const orgName = data[0].organism.name;
				service
					.records(geneToExpressionQuery({ geneId, orgName }))
					.then(data => resolve(data[0]))
					.catch(reject);
			})
			.catch(reject);
	});
}

export { queryData };
