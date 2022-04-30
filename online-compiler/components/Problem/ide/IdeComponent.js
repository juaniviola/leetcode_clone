import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import SubmissionComponent from '../submission/SubmissionComponent';
import styles from '../../styles/Ide.module.css';
import { runCode, submitCode } from './modules';

export default function IdeComponent({ templates, input, problemId, userId }) {
  // editor
  const [language, setLanguage] = useState('cpp');
  const [template, setTemplate] = useState('// some code here');
  const [theme, setTheme] = useState('vs-light');
  const [themeButton, setThemeButton] = useState('🌞');
  const [code, setCode] = useState('');
  const [extension, setExtension] = useState('cpp');

  // submissions
  const [loading, setLoading] = useState(false);
  const [submission, setSubmission] = useState('');
  const [result, setResults] = useState('');
  const [typeSubmission, setTypeSubmission] = useState('');

  useEffect(() => {
    setTemplate(templates[0] || '// some code here');
    setCode(templates[0] || '// some code here');
  }, [templates, input, problemId, userId]);

  const handleChangeTheme = (e) => {
    e.preventDefault();

    if (themeButton === '🌞') {
      setTheme('vs-dark');
      setThemeButton('🌙');
      return;
    }
    setTheme('vs-light');
    setThemeButton('🌞');
  };

  const handleChangeLanguage = (e) => {
    const lang = e.target.value;
    if (lang === 'js') {
      setExtension('js');
      setLanguage('javascript');
      setTemplate(templates[1]);
      setCode(templates[1]);
    } else if (lang === 'cpp') {
      setExtension('cpp');
      setLanguage('cpp');
      setTemplate(templates[0]);
      setCode(templates[0]);
    }
  };

  const handleRunCode = async () => {
    try {
      setLoading(true);
      await runCode(
        code,
        extension,
        problemId,
        setSubmission,
        setResults,
        setTypeSubmission,
        userId,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    try {
      setLoading(true);
      await submitCode(
        code,
        extension,
        problemId,
        setSubmission,
        setResults,
        setTypeSubmission,
        userId,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.line}></div>
      <div className={styles.config}>
        <select
          name="select"
          className={styles.select}
          defaultValue="cpp"
          onChange={handleChangeLanguage}
        >
          <option value="cpp">C++</option>
          <option value="js">Javascript</option>
        </select>

        <a href='#' className={styles.theme} onClick={handleChangeTheme}>{themeButton}</a>
      </div>

      <Editor
        height="400px"
        defaultLanguage={language}
        language={language}
        theme={theme}
        value={template}
        onChange={(value, _) => setCode(value)}
      />

      <div className={styles.compile}>
        <div className={styles.buttons}>
          <button
            type='button'
            className={styles.run_button}
            onClick={handleRunCode}
            disabled={loading}
          >▶ Run Code</button>
          <button
            type='button'
            className={styles.submit_button}
            onClick={handleSubmitCode}
            disabled={loading}
          >☁ Submit</button>
        </div>
      </div>

      <div className={styles.line}></div>

      {submission.length > 1 ? (
        <SubmissionComponent
          status={submission}
          output={result}
          input={input}
          type={typeSubmission}
        />
      ) : null}
    </div>
  );
}
