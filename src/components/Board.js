import React, { Component } from 'react';
import Square from './Square';

export class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={i[0]}
        winningSquare={this.props.winningSquares.includes(i[0])}
        value={this.props.squares[i[0]]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBoard(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(this.renderSquare([i * size + j, [i + 1, j + 1]]));
      }
      board.push(
        <div key={i} className='board-row'>
          {row}
        </div>
      );
    }
    return board;
  }

  render() {
    return <div>{this.renderBoard(3)}</div>;
  }
}

export default Board;
