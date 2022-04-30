import { useState } from 'react';
import styles from '../../styles/Hints.module.css';

export default function HintsComponent({ hints = [] }) {
  const [open, toggleOpen] = useState(new Array(hints.length).fill(false));

  const handleToggle = (index) => {
    const copy = [...open];
    copy[index] = !copy[index];

    toggleOpen(copy);
  };

  return (
    <div className='hints-container'>
      {hints.map((hint, index) => (
        <details className={styles.details} key={hint} onToggle={() => handleToggle(index)}>
          <summary className={styles.summary}>
            💡 {open[index] ? 'Hide' : 'Show'} hint #{index + 1}
          </summary>
          {hint}
        </details>
      ))}
    </div>
  );
}
