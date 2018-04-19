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
			historyPlayerTurn: ['✖️'],
			stepNumber: 0,
			xIsNext: true,
			isReverse: false,
			lastPosition: null
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? '✖️' : '⭕';

		// Use Spread for easy life
		this.setState({
			history: [...history, {squares}],
			historyPosition: [...this.state.historyPosition, i],
			historyPlayerTurn: [...this.state.historyPlayerTurn, squares[i]],
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

		const moves = history.map((step, move) => {
			// This 💩 already has default player start in Array
			const loopPlayerTurn = this.state.historyPlayerTurn[move];

			// move begin with 0, that time nothing in Array. so next loop we need start with 0 ( current move = 1)
			const loopPosition = this.state.historyPosition[move - 1];

			// If you don't know way to get key of Board, here is solution
			let loopHistoryRow;

			if (loopPosition < 3)
				loopHistoryRow = 0;
			else if (loopPosition < 6)
				loopHistoryRow = 1;
			else
				loopHistoryRow = 2;


			const numberCellEachRow = 3;
			const numberRowOfGame = 3;
			const indexCell = Math.abs((loopPosition - numberCellEachRow) % numberRowOfGame);

			const desc = move ?
				`💥 #${move}: ${loopPlayerTurn} ${loopHistoryRow} - ${indexCell}` :
				"💣️";

			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{move === this.state.stepNumber ? <b>{desc}</b> : desc}
					</button>
				</li>
			);
		});

		// is game has Winner???
		let status;
		const currentPlayer = this.state.xIsNext ? '✖️' : '⭕';

		if (winner) {
			status = '🏆 Winner: ' + winner.winnerPlayer;
		} else if (this.state.stepNumber === 9) {
			status = '😬 Draw';
		} else {
			status = '🔥 Next player: ' + currentPlayer;
		}


		const isReverse = this.state.isReverse; // Variable help check state reverse list history
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
					<button onClick={() => this.reverseClick(isReverse)}>
						<span aria-labelledby="jsx-a11y/accessible-emoji" role="img">🙃</span>
					</button>
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
			return {
				winnerPlayer: squares[a],
				winnerLocation: lines[i]
			};
		}
	}
	return null;
}

export default Game;