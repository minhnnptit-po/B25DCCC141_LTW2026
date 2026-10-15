import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Nguyễn Văn An', score: 9.0, class: 'D24CQCN01' },
  { id: 2, name: 'Trần Thị Bình', score: 7.5, class: 'D24CQCN01' },
  { id: 3, name: 'Lê Hoàng Cường', score: 4.5, class: 'D24CQCN02' },
  { id: 4, name: 'Phạm Minh Dũng', score: 8.0, class: 'D24CQCN02' },
  { id: 5, name: 'Hoàng Thu Hà', score: 3.0, class: 'D24CQCN03' },
];

const FILTERS = {
  ALL: 'all',
  GOOD: 'good',
  FAIL: 'fail',
};

const FILTER_OPTIONS = [
  { value: FILTERS.ALL, label: 'Tất cả' },
  { value: FILTERS.GOOD, label: 'Loại Giỏi (≥ 8)' },
  { value: FILTERS.FAIL, label: 'Trượt môn (< 5)' },
];

const applyFilter = (students, filter) => {
  if (filter === FILTERS.GOOD) return students.filter(({ score }) => score >= 8);
  if (filter === FILTERS.FAIL) return students.filter(({ score }) => score < 5);
  return students;
};

const calcAverage = (students) => {
  if (students.length === 0) return 0;
  const total = students.reduce((sum, { score }) => sum + score, 0);
  return total / students.length;
};

const getNextId = (students) =>
  students.reduce((maxId, { id }) => Math.max(maxId, id), 0) + 1;

const App = () => {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [filter, setFilter] = useState(FILTERS.ALL);

  const handleAddStudent = ({ name, score, className }) => {
    setStudents((prevStudents) => [
      ...prevStudents,
      { id: getNextId(prevStudents), name, score, class: className },
    ]);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  const visibleStudents = applyFilter(students, filter);
  const average = calcAverage(students);

  return (
    <div className="app">
      <header className="app__header">
        <h1>📚 Quản lý Điểm Sinh viên</h1>
      </header>

      <section className="card">
        <h2>Thêm sinh viên mới</h2>
        <StudentForm onAdd={handleAddStudent} />
      </section>

      <section className="card">
        <h2>Thống kê</h2>
        <div className="stats">
          <div className="stats__item">
            <span className="stats__label">Tổng số sinh viên</span>
            <strong className="stats__value">{students.length}</strong>
          </div>
          <div className="stats__item">
            <span className="stats__label">Điểm trung bình lớp</span>
            <strong className="stats__value">{average.toFixed(2)}</strong>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card__head">
          <h2>{`Danh sách sinh viên (${visibleStudents.length}/${students.length})`}</h2>
          <div className="filters">
            {FILTER_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`btn btn--filter ${filter === value ? 'is-active' : ''}`}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <StudentList students={visibleStudents} onDelete={handleDeleteStudent} />
      </section>
    </div>
  );
};

export default App;
