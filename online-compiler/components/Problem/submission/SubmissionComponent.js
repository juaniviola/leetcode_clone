import styles from '../../styles/Submission.module.css';

export default function SubmissionComponent ({ status, input, output, type }) {
  // status -> Pending | TimeLimitedExceded | RuntimeError | WrongAnswer | Accepted | Out of Memory
  const style = status.split(' ').join('');
  const typeSubmission = type[0].toUpperCase().concat(type.substring(1));

  return (
    <div className={styles.container}>
      <h2>{typeSubmission} Code Status: <span className={styles[style]}>{status}</span></h2>

      {status !== 'Pending' && !!output ? (
        <div className={styles.results}>
          {type === 'run' ? (
            <div>
              <b>Input</b>
              <div className={styles.code}>{input.split('\n').map((str,i) => <p key={i}>{str}</p>)}</div>
            </div>
          ) : null}

          {output ? (
            <div>
              <b>Your Answer</b>
              <div className={styles.code}>{output.split('\n').map((str,i) => <p key={i}>{str}</p>)}</div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
