const Square = ({ value, onClick, winningSquare }) => {
  return (
    <button
      className={'square ' + (winningSquare ? 'square-win' : null)}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
