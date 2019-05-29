const imjs = require('imjs');
const queryStageExpData = require('../src/stageExpression').queryData;

describe('Expression By Stage Module', () => {
	const mockData = {
		geneId: '1000005',
		orgName: 'Drosophila melanogaster',
		serviceUrl: 'http://www.flymine.org/flymine/service'
	};

	describe('query', () => {
		test('should return a promise that resolves with correct result json', () => {
			const queryRes = queryStageExpData(
				mockData.geneId,
				mockData.orgName,
				mockData.serviceUrl,
				imjs
			);

			return queryRes.then(res => {
				expect(res).toHaveProperty('rnaSeqResults');
				expect(res.rnaSeqResults).toBeInstanceOf(Array);

				const firstVal = res.rnaSeqResults[0];
				expect(firstVal).toHaveProperty('class');
				expect(firstVal).toHaveProperty('expressionLevel');
				expect(firstVal).toHaveProperty('expressionScore');
				expect(firstVal).toHaveProperty('objectId');
				expect(firstVal).toHaveProperty('stage');
			});
		});

		test('should throw error when data corresponding to organism is not found', () => {
			const dataWithInvalidGeneId = Object.assign({}, mockData, {
				geneId: '1100000' // some wrong gene id
			});

			const queryRes = queryStageExpData(
				dataWithInvalidGeneId.geneId,
				dataWithInvalidGeneId.orgName,
				dataWithInvalidGeneId.serviceUrl,
				imjs
			);

			expect(queryRes).rejects.toBe('No data found!');
		});
	});
});
