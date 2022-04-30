import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import LoadingComponent from '../components/loading/LoadingComponents';
import { getProblemList } from '../modules/getData';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [statements, setStatements] = useState([]);

  useEffect(() => {
    getProblemList(setStatements, setLoading);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Problems</span>
      </div>
      {loading ? (
        <div className={styles.loading}>
          <LoadingComponent />
        </div>
      ) : (
        <div className={styles.list}>
          {statements.map((statement) => {
            return (
              <div key={statement.id} className={styles.problem}>
                <a href={`/${statement.id}`} className={styles.button}>📄 {statement.title}</a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}
