import { useNavigate } from 'react-router-dom';
import { TOPICS } from '../data';
import { SPEED_BONUS, SPEED_BONUS_MIN_TIME } from '../utils';

const Home = ({ playerName, setPlayerName, history, settings, setSettings }) => {
  const navigate = useNavigate();
  const canStart = playerName.trim() !== '';

 
  const best = history.reduce(
    (top, h) => (top === null || h.score > top.score ? h : top),
    null
  );

  const handleNameChange = (e) => setPlayerName(e.target.value);
  const handleTopicChange = (e) =>
    setSettings({ ...settings, topic: e.target.value });
  const handleShuffleChange = (e) =>
    setSettings({ ...settings, shuffle: e.target.checked });
  const handleBonusChange = (e) =>
    setSettings({ ...settings, speedBonus: e.target.checked });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canStart) return;
    navigate('/play');
  };

  return (
    <div>
      <h2>Rung chuông vàng</h2>

      {best && <p className="record">{`Kỷ lục: ${best.score} điểm – ${best.name}`}</p>}

      <ul>
        <li>Trả lời lần lượt 15 câu hỏi về HTML, CSS, JavaScript và React, mỗi câu có 20 giây.</li>
        <li>Câu dễ được 10 điểm, câu trung bình 20 điểm, câu khó 30 điểm.</li>
        <li>Trả lời sai hoặc hết giờ là bị loại, giữ nguyên số điểm đã có.</li>
        <li>Trả lời đúng cả 15 câu thì rung chuông vàng với 300 điểm.</li>
        <li>Có 3 quyền trợ giúp: loại 1 đáp án, thêm 15 giây, phao cứu sinh (mỗi quyền dùng một lần).</li>
      </ul>

      <fieldset className="settings">

        <label>
          Chủ đề thi:
          <select value={settings.topic} onChange={handleTopicChange}>
            <option value="">Tất cả</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={settings.shuffle}
            onChange={handleShuffleChange}
          />
          Xáo trộn thứ tự 4 đáp án
        </label>

        <label>
          <input
            type="checkbox"
            checked={settings.speedBonus}
            onChange={handleBonusChange}
          />
          {`Thưởng tốc độ: trả lời đúng khi còn từ ${SPEED_BONUS_MIN_TIME} giây trở lên được +${SPEED_BONUS} điểm`}
        </label>
      </fieldset>

      <form className="home-form" onSubmit={handleSubmit}>
        <label>
          Tên người chơi:{' '}
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            placeholder="Nhập tên của bạn"
          />
        </label>
        <button type="submit" className="btn" disabled={!canStart}>
          Vào thi
        </button>
      </form>
    </div>
  );
};

export default Home;
