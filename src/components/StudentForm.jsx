import { useState } from 'react';

const EMPTY_FORM = { name: '', score: '', className: '' };

const validate = ({ name, score, className }) => {
  if (name.trim() === '' || score.trim() === '' || className.trim() === '') {
    return 'Vui lòng nhập đầy đủ Họ tên, Điểm số và Lớp.';
  }

  const numericScore = Number(score);
  if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
    return `Điểm số không hợp lệ (“${score}”). Điểm phải nằm trong khoảng từ 0 đến 10.`;
  }

  return '';
};

const StudentForm = ({ onAdd }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const { name, score, className } = form;

  const handleChange = (event) => {
    const { name: field, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = validate(form);
    if (message) {
      setError(message);
      return;
    }

    onAdd({
      name: name.trim(),
      score: Number(score),
      className: className.trim(),
    });
    setForm(EMPTY_FORM);
    setError('');
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        <label className="form__field">
          <span>Họ tên</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="VD: Nguyễn Văn A"
          />
        </label>

        <label className="form__field">
          <span>Điểm số (0 - 10)</span>
          <input
            type="number"
            name="score"
            value={score}
            onChange={handleChange}
            placeholder="VD: 8.5"
            step="0.1"
          />
        </label>

        <label className="form__field">
          <span>Lớp</span>
          <input
            type="text"
            name="className"
            value={className}
            onChange={handleChange}
            placeholder="VD: D24CQCN01"
          />
        </label>

        <button type="submit" className="btn btn--primary">
          Thêm
        </button>
      </div>

      {error && (
        <p className="form__error" role="alert">
          ⚠️ {error}
        </p>
      )}
    </form>
  );
};

export default StudentForm;
