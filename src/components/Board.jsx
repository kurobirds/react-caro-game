import React from 'react';
import Square from '../components/Square';

class Board extends React.Component {
	renderSquare(i, winner) {
		return <Square
			key={i}
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
			winner={winner && winner.winnerLocation.includes(i) ? 'winner' : ''}
		/>;
	}

	render() {
		let rows = [];
		let cells = [];
		let cellNumber = 0;
		const winner = this.props.winner;

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				cells.push(this.renderSquare(cellNumber, winner));
				cellNumber++;
			}
			rows.push(<div key={i} className="board-row">{cells}</div>);
			cells = [];
		}

		return (
			<div>
				{rows}
			</div>
		);
	}
}

export default Board;