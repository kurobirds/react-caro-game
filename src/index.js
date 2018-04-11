import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	const squareClass = `square ${props.winner}`;
	return (
		<button className={squareClass} onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true
		}
	}


	handleClick(i) {
		const squares = this.state.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? 'X' : 'O';

		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext
		})
	};

	renderSquare(i, winner) {
		return <Square
			value={this.state.squares[i]}
			onClick={() => this.handleClick(i)}
			winner={winner && winner.winnerLocation.includes(i) ? 'winner' : ''}
		/>;
	}

	render() {
		const winner = calculateWinner(this.state.squares);
		let status;

		if (winner) {
			status = 'Winner: ' + winner.winnerPlayer;
		}
		else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0, winner)}
					{this.renderSquare(1, winner)}
					{this.renderSquare(2, winner)}
				</div>
				<div className="board-row">
					{this.renderSquare(3, winner)}
					{this.renderSquare(4, winner)}
					{this.renderSquare(5, winner)}
				</div>
				<div className="board-row">
					{this.renderSquare(6, winner)}
					{this.renderSquare(7, winner)}
					{this.renderSquare(8, winner)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board/>
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game/>,
	document.getElementById('root')
);

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			// return squares[a];
			return {
				winnerPlayer: squares[a],
				winnerLocation: lines[i]
			};
		}
	}
	return null;
}