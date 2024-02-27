import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/userSlice";
import avatar from "../../assets/Rectangle 1.png";
import styles from "./Header.module.scss";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const unauthorizedHeader = (
    <div className={styles.buttonsWrap}>
      <Link to="/sign-in">
        <button className={styles.signInBtn} type="button">Sign In</button>
      </Link>
      <Link to="/sign-up">
        <button className={styles.signUpBtn} type="button">Sign Up</button>
      </Link>
    </div>
  );
  const authorizedHeader = (
    <div className={styles.buttonsWrap}>
      <Link to="/new-article">
        <button className={styles.createBtn} type="button">Create article</button>
      </Link>
      <Link to="/profile">
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{user?.username}</span>
          <img className={styles.authorImage} src={user?.image || avatar} alt="Avatar" />
        </div>
      </Link>
      <button className={styles.logOutBtn} type="button" onClick={onLogout}>Log Out</button>
    </div>
  );
  return (
    <header>
      <Link to="/" className={styles.title}>
        <h6>Realworld Blog</h6>
      </Link>
      {!user && unauthorizedHeader}
      {user && authorizedHeader}
    </header>
  );
}

export default Header;
