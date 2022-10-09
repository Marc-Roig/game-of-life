const Cell = ({ cell, dragged, handleCellClick }) => {
  const { isAlive, aliveFor = 0 } = cell;

  const cellColor = () => {
    if (isAlive) {
      if (aliveFor > 5) return "cell-old";
      if (aliveFor > 3) return "cell-mature";
      if (aliveFor > 1) return "cell-young";
      return "cell-newborn";
    }
    return "cell-dead";
  };

  return (
    <div
      className={`cell ${isAlive ? cellColor() : ""}`}
      onClick={(e) => handleCellClick()}
      onMouseEnter={(e) => dragged && handleCellClick()}
    />
  );
};

export default Cell;
