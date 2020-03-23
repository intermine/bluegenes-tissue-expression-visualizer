import React from 'react';

const Cell = ({ id, name, text, value, checked, onChange }) => (
	<label htmlFor={id}>
		<input
			type="radio"
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			checked={checked}
		/>
		<span>{text}</span>
	</label>
);

function TisuseExpressionControls({ controlOptions, changeOptions }) {
	return (
		<div className="controls">
			<Cell
				id="logarithmic-scale"
				name="scale"
				value="log"
				text="Logarithmic Scale"
				onChange={changeOptions}
				checked={controlOptions['scale'] === 'log'}
			/>
			<Cell
				id="order-by-name"
				name="sort"
				value="name"
				text="Order By Name"
				onChange={changeOptions}
				checked={controlOptions['sort'] === 'name'}
			/>
			<Cell
				id="show-enrichment"
				name="val"
				value="enrichment"
				text="Show Enrichment"
				onChange={changeOptions}
				checked={controlOptions['val'] === 'enrichment'}
			/>
			<Cell
				id="linear-scale"
				name="scale"
				value="linear"
				text="Linear Scale"
				onChange={changeOptions}
				checked={controlOptions['scale'] === 'linear'}
			/>
			<Cell
				id="order-by-signal"
				name="sort"
				value="signal"
				text="Order By Signal"
				onChange={changeOptions}
				checked={controlOptions['sort'] === 'signal'}
			/>
			<Cell
				id="show-signal-strength"
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
