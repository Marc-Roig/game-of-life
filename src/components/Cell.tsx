const Cell = ({ cell, handleCellClick, size = 20 }) => {
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
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={(e) => handleCellClick()}
    />
  );
};

export default Cell;
