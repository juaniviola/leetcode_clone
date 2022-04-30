import { signOut } from "firebase/auth";
import styles from '../../styles/Header.module.css';

export default function Header ({ auth, children }) {
  const handleClick = (e) => {
    e.preventDefault();
    const userLogout = confirm('Are you sure?');

    if (userLogout) {
      signOut(auth);
    }
  };

  return (
    <div>
      <a
        href="#"
        onClick={handleClick}
        className={styles.button}
      >Logout</a>
      {children}
    </div>
  );
}
