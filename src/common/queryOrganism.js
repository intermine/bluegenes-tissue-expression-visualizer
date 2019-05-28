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

function queryOrganism(geneId, serviceUrl) {
	return new Promise(resolve => {
		// eslint-disable-next-line
		const service = new imjs.Service({ root: serviceUrl });
		service.records(geneToOrgQuery(geneId)).then(data => {
			if (data.length === 0) throw new Error('No organism associated!');
			const orgName = data[0].organism.name;
			resolve(orgName);
		});
	});
}

export default queryOrganism;
