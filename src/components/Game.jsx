import React from 'react';
import Board from '../components/Board';


class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			historyPosition: [],
			historyPlayerTurn: ['X'],
			stepNumber: 0,
			xIsNext: true,
			isReverse: false,
			lastPosition: null
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const cells = {
			squares: current.squares.slice()
		};

		if (calculateWinner(cells.squares) || cells.squares[i]) {
			return;
		}

		cells.squares[i] = this.state.xIsNext ? 'X' : 'O';

		this.setState({
			history: [...history, cells],
			historyPosition: [...this.state.historyPosition, i],
			historyPlayerTurn: [...this.state.historyPlayerTurn, cells.squares[i]],
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		});
	}

	reverseClick(isReverse) {
		this.setState({
			isReverse: !isReverse
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const isReverse = this.state.isReverse;
		const currentPlayer = this.state.xIsNext ? 'X' : 'O';


		const moves = history.map((step, move) => {

			const currentMove = this.state.historyPosition[move - 1];

			let rowHistory;
			if (currentMove < 3)
				rowHistory = 0;
			else if (currentMove < 6)
				rowHistory = 1;
			else
				rowHistory = 2;

			const cellInRow = Math.abs((currentMove - 3) % 3);

			const desc = move ?
				`Move #${move}: ${this.state.historyPlayerTurn[move]} ${rowHistory} ${cellInRow}` :
				`Game start ${this.state.historyPlayerTurn[move]}`;

			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{move === this.state.stepNumber ? <b>{desc}</b> : desc}
					</button>
				</li>
			);
		});

		let status;

		if (winner) {
			status = 'Winner: ' + winner.winnerPlayer;
		} else if (this.state.stepNumber === 9) {
			status = 'Draw';
		} else {
			status = 'Next player: ' + currentPlayer;
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
						winner={winner}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{isReverse ? moves.reverse() : moves}</ol>
					<button onClick={() => this.reverseClick(isReverse)}>Reverse</button>
				</div>
			</div>
		);
	}
}

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

export default Game;