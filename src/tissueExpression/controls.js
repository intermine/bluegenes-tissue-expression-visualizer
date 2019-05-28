import React from 'react';

const Cell = ({ name, text, value, checked, onChange }) => (
	<div>
		<input
			type="radio"
			name={name}
			value={value}
			onChange={onChange}
			checked={checked}
		/>
		<span>{text}</span>
	</div>
);

function TisuseExpressionControls({ controlOptions, changeOptions }) {
	return (
		<div className="controls">
			<Cell
				name="scale"
				value="log"
				text="Logarithmic Scale"
				onChange={changeOptions}
				checked={controlOptions['scale'] === 'log'}
			/>
			<Cell
				name="sort"
				value="name"
				text="Order By Name"
				onChange={changeOptions}
				checked={controlOptions['sort'] === 'name'}
			/>
			<Cell
				name="val"
				value="enrichment"
				text="Show Enrichment"
				onChange={changeOptions}
				checked={controlOptions['val'] === 'enrichment'}
			/>
			<Cell
				name="scale"
				value="linear"
				text="Linear Scale"
				onChange={changeOptions}
				checked={controlOptions['scale'] === 'linear'}
			/>
			<Cell
				name="sort"
				value="signal"
				text="Order By Signal"
				onChange={changeOptions}
				checked={controlOptions['sort'] === 'signal'}
			/>
			<Cell
				name="val"
				value="signal"
				text="Show Signal Strength"
				onChange={changeOptions}
				checked={controlOptions['val'] === 'signal'}
			/>
		</div>
	);
}

export default TisuseExpressionControls;
