import React from 'react';

const Square = (props) => {
	const squareClass = `square ${props.winner}`;
	return (
		<button className={squareClass} onClick={props.onClick}>
			{props.value}
		</button>
	);
};

export default Square;