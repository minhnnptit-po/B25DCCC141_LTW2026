import { EXTRA_TIME } from '../data';

const Helpers = ({ used, lifeActive, disabled, onFifty, onTime, onLife }) => (
  <div className="helpers">
    <button
      className="btn"
      onClick={onFifty}
      disabled={disabled || used.fifty}
    >
      Loại 1 đáp án
    </button>

    <button className="btn" onClick={onTime} disabled={disabled || used.time}>
      {`Thêm ${EXTRA_TIME} giây`}
    </button>

    <button className="btn" onClick={onLife} disabled={disabled || used.life}>
      {lifeActive ? 'Phao đang bật' : 'Phao cứu sinh'}
    </button>
  </div>
);

export default Helpers;
