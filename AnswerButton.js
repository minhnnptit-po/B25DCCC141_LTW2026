const AnswerButton = ({ letter, text, state, disabled, hidden, onClick }) => {
  if (hidden) {
    return <button className="answer-btn removed" disabled aria-hidden="true" />;
  }

  return (
    <button
      className={`answer-btn ${state}`}
      disabled={disabled}
      onClick={onClick}
    >
      {letter}. {text}
    </button>
  );
};

export default AnswerButton;