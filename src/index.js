import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './components/Board';
import Toggle from './components/Toggle';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: [],
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isToggle: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // the  current is stored the last history object. Which is the last squares key value pair.
    const current = history[history.length - 1];

    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i[0]]) {
      return;
    }
    squares[i[0]] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares: squares,
          location: i[1],
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  onToggle() {
    this.setState({
      isToggle: !this.state.isToggle,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move
        ? `COL- ${step.location[0]} ROW- ${step.location[1]} | Go to move # ${move}`
        : 'Go to game start';
      return (
        <li key={move}>
          <button className='history-button' onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <strong>{desc}</strong> : desc}
          </button>
        </li>
      );
    });

    let status;
    winner
      ? (status = 'Winner: ' + winner.theWinner)
      : !current.squares.includes(null)
      ? (status = 'Now Winner, Try again')
      : (status = 'Next player ' + (this.state.xIsNext ? 'X' : 'O'));

    return (
      <>
        <h1>Tic-Tac-Toe</h1>
        <div className='game'>
          <div className='game-board'>
            <Board
              winningSquares={winner ? winner.winningCells : []}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className='game-info'>
            <div className='game-info_status'>{status}</div>
            <ol>{this.state.isToggle ? moves : moves.reverse()}</ol>
          </div>
          <Toggle
            onToggle={() => this.onToggle()}
            button={`SORT ${this.state.isToggle ? '↓' : '↑'}`}
          />
        </div>
      </>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

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
      return { theWinner: squares[a], winningCells: [a, b, c] };
    }
  }
  return null;
}
