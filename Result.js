import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const getHeadline = (reason, total, topic) => {
  if (reason === 'perfect') return 'Chúc mừng! Bạn đã rung chuông vàng';
  if (reason === 'topicPerfect') {
    return `Chúc mừng! Bạn đã trả lời đúng cả ${total} câu chủ đề ${topic}`;
  }
  if (reason === 'wrong') return 'Bạn đã bị loại';
  if (reason === 'timeout') return 'Hết giờ!';
  return `Bạn đã hoàn thành ${total} câu`;
};

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Navigate to="/" replace />;

  const { name, score, rank, correctCount, reason, total, topic } = state;

  return (
    <div>
      {}
      {reason === 'perfect' && (
        <div className="bell" role="img" aria-label="Chuông vàng">
          🔔
        </div>
      )}

      <h2>{getHeadline(reason, total, topic)}</h2>
      <p>Người chơi: {name}</p>
      {topic && <p>Chủ đề thi: {topic}</p>}
      <p>Số câu trả lời đúng: {correctCount}</p>
      <p>Điểm: {score}</p>
      <p>Danh hiệu: {rank}</p>

      <div className="result-actions">
        <button className="btn" onClick={() => navigate('/play')}>
          Chơi lại
        </button>
        <button className="btn btn-light" onClick={() => navigate('/')}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;
