const imjs = require('imjs');
const queryOrgName = require('../src/common/queryOrganism').default;

describe('queryOrganism', () => {
	test('should return a promise with resolves with organism name of gene id passed', () => {
		// some fake gene id and test service url
		const mockData = {
			geneId: '1000005',
			serviceUrl: 'http://www.flymine.org/flymine/service',
			result: 'Drosophila melanogaster'
		};
		const queryRes = queryOrgName(mockData.geneId, mockData.serviceUrl, imjs);
		return expect(queryRes).resolves.toBe(mockData.result);
	});

	test('should throw error if no organism is found for the gene id passed', () => {
		// some fake gene id and test service url
		const mockData = {
			geneId: 'some_wrong_gene_id',
			serviceUrl: 'http://www.flymine.org/flymine/service'
		};
		const queryRes = queryOrgName(mockData.geneId, mockData.serviceUrl, imjs);
		return expect(queryRes).rejects.toBe('No associated organism found!');
	});
});
