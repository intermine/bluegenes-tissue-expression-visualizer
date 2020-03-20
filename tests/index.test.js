const React = require('react');
const ReactDOM = require('react-dom');
const RootContainer = require('../src/RootContainer').default;
const main = require('../src').main;

// Example
describe('main', () => {
	test('should throw error when called with wrong signature', () => {
		expect(() => {
			// testing with all falsy values
			main('', 0, null, undefined, []);
		}).toThrowError('Call main with correct signature');
	});

	test('should render something (atleast a div) into the `elem` passed', () => {
		const el = document.createElement('div');
		ReactDOM.render(
			<RootContainer
				entity={{}}
				serviceUrl="http://www.flymine.org/flymine"
				testing={true}
			/>,
			el
		);
		expect(el.innerHTML).toContain('div');
		expect(el.innerHTML).not.toEqual('');
	});
});
