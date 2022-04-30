import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { firebaseApp } from '../../../config';
import styles from '../../styles/Signin.module.css';

export default function Signin() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const auth = getAuth(firebaseApp());
    const googleProvider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleClick}
        className={styles.button}
        disabled={loading}
      >Signin with Google</button>
    </div>
  );
}
