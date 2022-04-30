import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseApp } from '../config';
import '../styles/globals.css'
import Signin from '../components/Login/signin/SigninComponent';
import Header from '../components/Login/header/Header';
import Loading from '../components/loading/LoadingComponents';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authApp, setAuthApp] = useState(null);

  useEffect(() => {
    firebaseApp();
    const auth = getAuth();
    setAuthApp(auth);

    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const signinOrHome = user ? (
      <Header auth={authApp}>
        <Component {...pageProps} userId={user.uid} />
      </Header>
    ) : <Signin />;

  return (
    <div>
      {loading ? (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loading />
        </div>
      ) : signinOrHome}
    </div>
  );
}

export default MyApp;
