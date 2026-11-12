import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, TOPICS } from '../data';

const QuestionBank = ({ questions }) => {
  const [topic, setTopic] = useState('');
  const [term, setTerm] = useState('');

  const handleTopicChange = (e) => setTopic(e.target.value);
  const handleTermShift = (e) => setTerm(e.target.value);

  const keyword = term.trim().toLowerCase();
  const filtered = questions.filter((q) => {
    const matchTopic = topic === '' || q.topic === topic;
    const matchTerm = q.question.toLowerCase().includes(keyword);
    return matchTopic && matchTerm;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>

      <div className="filters">
        <label>
          Chủ đề:
          <select value={topic} onChange={handleTopicChange}>
            <option value="">Tất cả</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tìm kiếm:
          <input
            type="text"
            value={term}
            onChange={handleTermShift}
            placeholder="Nhập nội dung câu hỏi..."
          />
        </label>
      </div>

      <p>Có {filtered.length} câu hỏi</p>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{q.topic}</td>
              <td>{LEVELS[q.level]}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
