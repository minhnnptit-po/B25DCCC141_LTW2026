import { LETTERS, LEVELS } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({
  question,
  index,
  total,
  optionStates,
  hiddenOptions,
  disabled,
  onSelect,
}) => {
  const { topic, level, options } = question;

  return (
    <div className="question-card">
      <p className="question-meta">
        {`Câu ${index + 1}/${total} · ${topic} · ${LEVELS[level]}`}
      </p>
      <h3 className="question-text">{question.question}</h3>

      <div className="answers">
        {options.map((option, i) => (
          <AnswerButton
            key={i}
            letter={LETTERS[i]}
            text={option}
            state={optionStates[i]}
            hidden={hiddenOptions.includes(i)}
            disabled={disabled}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
