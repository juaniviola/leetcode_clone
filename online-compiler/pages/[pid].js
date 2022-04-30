import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProblem } from '../modules/getData';
import styles from '../styles/pid.module.css'
import DescriptionComponent from '../components/Problem/description/DescriptionComponent';
import HintsComponent from '../components/Problem/hints/HintsComponent';
import IdeComponent from '../components/Problem/ide/IdeComponent';
import LoadingComponent from '../components/loading/LoadingComponents';

export default function Problem({ userId }) {
  const router = useRouter();
  const { pid } = router.query;

  const [loading, setLoading] = useState(true);
  const [statement, setStatement] = useState({});

  useEffect(() => {
    getProblem(setLoading, setStatement, pid);
  }, [pid]);

  return (
    <div className={styles.container}>
      {!!statement.title && !loading ? (
        <div>
          <DescriptionComponent title={statement.title}>
            <div dangerouslySetInnerHTML={{__html: statement.statement}}></div>
          </DescriptionComponent>

          <HintsComponent hints={statement.hints} />

          <IdeComponent
            templates={statement.templates}
            input={statement.input}
            problemId={pid}
            userId={userId}
          />
        </div>
      ) : (
        <div className={styles.loading}>
          <LoadingComponent />
        </div>
      )}
    </div>
  );
}
