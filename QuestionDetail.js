import { useNavigate, useParams } from 'react-router-dom';
import { LETTERS, LEVELS, POINTS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <h2>Không tìm thấy câu hỏi</h2>
        <button className="btn" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  const { topic, level, options, answer } = question;

  return (
    <div>
      <h2>{`Câu hỏi số ${question.id} – ${topic} (${LEVELS[level]}, ${POINTS[level]} điểm)`}</h2>
      <p>{question.question}</p>

      {options.map((option, index) => (
        <div
          key={index}
          className={index === answer ? 'option correct' : 'option'}
        >
          {LETTERS[index]}. {option}
          {index === answer && ' (Đáp án đúng)'}
        </div>
      ))}

      <button className="btn" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </div>
  );
};

export default QuestionDetail;
