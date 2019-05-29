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

// dependency injection implmentation - imjsClient
// eslint-disable-next-line
function queryOrganism(geneId, serviceUrl, imjsClient = imjs) {
	return new Promise((resolve, reject) => {
		const service = new imjsClient.Service({ root: serviceUrl });
		service
			.records(geneToOrgQuery(geneId))
			.then(data => {
				if (data.length === 0) throw new Error('No organism associated!');
				const orgName = data[0].organism.name;
				resolve(orgName);
			})
			.catch(() => reject('No associated organism found!'));
	});
}

export default queryOrganism;
