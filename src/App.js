// import logo from "./logo.svg";
// import './App.css';

// function MyButton() {
// 	return <button>I'm a button</button>;
// }
// function AboutPage() {
// 	return (
// 		<>
// 			<h1>About</h1>
// 			<p>
// 				Hello there. <br />
// 				How do you do?
// 			</p>
// 		</>
// 	);
// }

// const user = {
// 	name: "Hedy Lamarr",
// 	imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
// 	imageSize: 90,
// };

// export default function Profile() {
// 	return (
// 		<>
// 			<h1>{user.name}</h1>
// 			<img
// 				className="avatar"
// 				src={user.imageUrl}
// 				alt={"Photo of " + user.name}
// 				style={{
// 					width: user.imageSize,
// 					height: user.imageSize,
// 				}}
// 			/>
// 		</>
// 	);
// }
// function App() {
// 	return (
// 		<div>
// 			<h1>Welcome to my app</h1>
// 			<MyButton />
// 		</div>
// 	);
// }

// export default App;

// const products = [
// 	{ title: "Cabbage", isFruit: false, id: 1 },
// 	{ title: "Garlic", isFruit: false, id: 2 },
// 	{ title: "Apple", isFruit: true, id: 3 },
// ];

// export default function ShoppngList() {
// 	const listItems = products.map((product) => (
// 		<li
// 			key={product.id}
// 			style={{
// 				color: product.isFruit ? "magenta" : "darkgreen",
// 			}}
// 		>
// 			{product.title}
// 		</li>
// 	));

// 	return <ul>{listItems}</ul>;
// }

// export default function MyApp() {
// 	return (
// 		<div>
// 			<h1>Counters that update separately</h1>
// 			<MyButton />
// 			<MyButton />
// 		</div>
// 	);
// }

// function MyButton() {
// 	const [count, setCount] = useState(0);

// 	function handleClick() {
// 		setCount(count + 1);
// 	}

// 	return <button onClick={handleClick}>Clicked {count} times</button>;
// }

// export default function MyApp() {
// 	const [count, setCount] = useState(0);

// 	function handleClick() {
// 		setCount(count + 1);
// 	}

// 	return (
// 		<div>
// 			<h1>Counters that update together</h1>
// 			<MyButton count={count} onClick={handleClick} />
// 			<MyButton count={count} onClick={handleClick} />
// 		</div>
// 	);
// }

// function MyButton({ count, onClick }) {
// 	return <button onClick={onClick}>clicked {count} times.</button>;
// }

import { useState } from 'react';

function Square({ value, onSquareClick, highlight }) {
	return (
		<button
			className={highlight ? 'square-win' : 'square'}
			onClick={onSquareClick}>
			{value} {highlight}
		</button>
	);
}

function Board({ xIsNext, squares, onPlay }) {
	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) return;

		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}
		onPlay(nextSquares);
		// nextSquares[i] = 'X';
		// setXIsNext(!xIsNext);
		// setSquares(nextSquares);
	}

	// const [winner, winningLine] = calculateWinner(squares);
	const winningLine = calculateWinner(squares);
	// let winningLine = [];
	// winningLine = calculateWinner(squares);
	const winner = squares[winningLine?.[0]];
	let status;
	let isDraw = false;
	if (winner) {
		status = 'Winner ' + winner;
		// console.log('\nWinningLine : ' + winningLine);
	} else {
		isDraw = !squares.includes(null);
		status = 'Next Player : ' + (xIsNext ? 'X' : 'O');
	}

	const N = Math.sqrt(squares.length);
	return (
		<>
			<div className='status' key={status}>
				{status}
			</div>
			<div>{isDraw ? 'Draw' : ''}</div>
			{Array(N)
				.fill(null)
				.map((_, row) => (
					<div className='board-row' key={row}>
						{Array(N)
							.fill(null)
							.map((_, col) => (
								<Square
									key={row * N + col}
									value={squares[row * N + col]}
									onSquareClick={() => handleClick(row * N + col)}
									highlight={
										winningLine !== null
											? winningLine.includes(row * N + col)
											: null
									}
								/>
							))}
					</div>
				))}
			{/* <div className='board-row'>
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div> */}
		</>
	);
}
export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const [isIncrease, setIsIncrease] = useState(true);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}
	function toggle() {
		setIsIncrease(!isIncrease);
	}

	const moves = history.map((squares, move) => {
		let description;
		let res = -1;

		if (move > 0) {
			res = squares.findIndex((value, idx) => value !== history[move - 1][idx]);
		}
		if (move === currentMove) {
			description =
				move === 0 ? 'You are at game start' : `You are at move # ${move}`;
		} else {
			description = move > 0 ? `Go to move # ${move}` : 'Go to game start';
		}

		return (
			<li key={move}>
				<div className='moveLocation'>
					{move === currentMove ? (
						<>
							{description}
							{res !== -1 ? (
								<div className='rowAndCol'>
									{` ${Math.floor(res / 3)} ${res % 3}`}
								</div>
							) : (
								''
							)}
						</>
					) : (
						<>
							<button onClick={() => jumpTo(move)}>{description}</button>
							{res !== -1 ? (
								<div className='rowAndCol'>
									{` ${Math.floor(res / 3)} ${res % 3}`}
								</div>
							) : (
								''
							)}
						</>
					)}
				</div>
			</li>
		);
	});

	return (
		<div className='game'>
			<div className='game-board'>
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<button onClick={toggle}>{isIncrease ? 'Increase' : 'Decrease'}</button>
				{isIncrease ? <ol>{moves} </ol> : <ol reversed>{moves.reverse()}</ol>}
			</div>
		</div>
	);
}

// function Square() {
// 	const [value, setValue] = useState(null);

// 	function handleClick() {
// 		console.log('clicked!');
// 		setValue('X');
// 	}
// 	return (
// 		<button className='square' onClick={handleClick}>
// 			{value}
// 		</button>
// 	);
// }

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

	for (let line of lines) {
		const [a, b, c] = line;
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			// console.log()
			// return squares[a];
			return line;
		}
	}
	return null;
}
