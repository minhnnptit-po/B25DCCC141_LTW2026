const getRank = (score) => {
  if (score >= 8) return { label: 'Giỏi', type: 'good' };
  if (score < 5) return { label: 'Trượt', type: 'fail' };
  return { label: 'Đạt', type: 'pass' };
};

const StudentItem = ({ index, student, onDelete }) => {
  const { id, name, score, class: className } = student;
  const { label, type } = getRank(score);

  return (
    <tr className={`row row--${type}`}>
      <td>{index}</td>
      <td>{name}</td>
      <td>{className}</td>
      <td className="cell-score">{score.toFixed(1)}</td>
      <td>
        <span className={`badge badge--${type}`}>{label}</span>
      </td>
      <td>
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => onDelete(id)}
          aria-label={`Xóa sinh viên ${name}`}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;
