import React from 'react';

const Cell = ({ name, text, value, onChange }) => (
	<div>
		<input type="radio" name={name} value={value} onChange={onChange} />
		<span>{text}</span>
	</div>
);

function TisuseExpressionControls({ changeOptions }) {
	return (
		<div className="controls">
			<Cell
				name="scale"
				value="log"
				text="Logarithmic Scale"
				onChange={changeOptions}
			/>
			<Cell
				name="sort"
				value="name"
				text="Order By Name"
				onChange={changeOptions}
			/>
			<Cell
				name="val"
				value="enrichment"
				text="Show Enrichment"
				onChange={changeOptions}
			/>
			<Cell
				name="scale"
				value="linear"
				text="Linear Scale"
				onChange={changeOptions}
			/>
			<Cell
				name="sort"
				value="signal"
				text="Order By Signal"
				onChange={changeOptions}
			/>
			<Cell
				name="val"
				value="signal"
				text="Show Signal Strength"
				onChange={changeOptions}
			/>
		</div>
	);
}

export default TisuseExpressionControls;
