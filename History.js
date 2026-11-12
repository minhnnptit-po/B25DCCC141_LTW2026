const History = ({ history, onClear }) => {
  if (history.length === 0) {
    return (
      <div>
        <h2>Lịch sử</h2>
        <p>Chưa có lượt chơi nào</p>
      </div>
    );
  }


  const sorted = [...history].sort((a, b) => b.score - a.score);
  const best = history.reduce((max, h) => Math.max(max, h.score), 0);
  const total = history.reduce((sum, h) => sum + h.score, 0);
  const average = Math.round(total / history.length);

  return (
    <div>
      <h2>Lịch sử</h2>

      <div className="stats">
        <p>Số lượt chơi: {history.length}</p>
        <p>Điểm cao nhất: {best}</p>
        <p>Điểm trung bình: {average}</p>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Điểm</th>
            <th>Danh hiệu</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((h) => (
            <tr key={h.id}>
              <td>{h.name}</td>
              <td>{h.correctCount}</td>
              <td>{h.score}</td>
              <td>{h.rank}</td>
              <td>{h.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <button className="btn btn-danger" onClick={onClear}>
          Xóa lịch sử
        </button>
      </p>
    </div>
  );
};

export default History;
