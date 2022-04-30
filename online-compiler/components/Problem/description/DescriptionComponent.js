import Image from 'next/image';
import styles from '../../styles/Description.module.css';

export default function DescriptionComponent({ children, title }) {
  return (
    <div>
      <div className={styles.title_container}>
        <a href="/">⬅ |</a>
        <Image src='/description.svg' width={24} height={24} alt='desc' />
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.problem}>
        {children}
      </div>
    </div>
  );
}
