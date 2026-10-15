import StudentItem from './StudentItem';

const StudentList = ({ students, onDelete }) => {
  if (students.length === 0) {
    return <p className="empty">Không có sinh viên nào để hiển thị.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Điểm</th>
            <th>Xếp loại</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentItem
              key={student.id}
              index={index + 1}
              student={student}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
