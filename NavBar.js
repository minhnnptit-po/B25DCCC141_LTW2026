import { NavLink } from 'react-router-dom';

const getClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

const NavBar = () => (
  <nav className="navbar">
    <NavLink to="/" end className={getClass}>
      Trang chủ
    </NavLink>
    <NavLink to="/questions" className={getClass}>
      Ngân hàng câu hỏi
    </NavLink>
    <NavLink to="/history" className={getClass}>
      Lịch sử
    </NavLink>
  </nav>
);

export default NavBar;
