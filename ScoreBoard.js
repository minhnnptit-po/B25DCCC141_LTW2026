const ScoreBoard = ({ score, total, answers, currentIndex }) => (
  <div className="scoreboard">
    <p className="score">Điểm: {score}</p>
    <div className="cells">
      {Array.from({ length: total }, (_, i) => {
        let className = 'cell';
        if (answers[i]?.saved) className += ' saved';
        else if (answers[i]?.correct) className += ' correct';
        else if (i === currentIndex) className += ' current';

        return (
          <div key={i} className={className}>
            {i + 1}
          </div>
        );
      })}
    </div>
  </div>
);

export default ScoreBoard;