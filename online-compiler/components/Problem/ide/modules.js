import axios from 'axios';

const uri = 'http://localhost:3080';

export async function submitCode(code, language, problem, setSubmission, setResults, setTypeSubmission, userId) {
  setTypeSubmission('submit');
  setSubmission('Pending');
  try {
    const output = await axios.post(`${uri}/judge`, {
      id: userId,
      code,
      language,
      problem,
    });

    const outputData = output.data;
    if (outputData === 'Time Limited Exceded' || outputData === 'Accepted' || outputData === 'Wrong Answer' || outputData === 'Out of Memory') {
      setSubmission(outputData);
      setResults(null);
    } else {
      setSubmission('Runtime Error');
      setResults(outputData);
    }
  } catch (err) {
    setSubmission('Server Error');
    setResults(null);
  }
}

export async function runCode(code, language, problem, setSubmission, setResults, setTypeSubmission, userId) {
  setTypeSubmission('run');
  setSubmission('Pending');
  try {
    const output = await axios.post(`${uri}`, {
      id: userId,
      code,
      language,
      problem,
    });

    let outputData = output.data;

    if (output.data.includes('Timeout after')) {
      setSubmission('Time Limited Exceded');
    } else {
      if (output.data.startsWith('solution:')) {
        if (output.data.includes('correct:true')) {
          setSubmission('Accepted');
          outputData = outputData
            .replace('solution:', '')
            .replace('correct:true', '');
        } else if (output.data.includes('correct:false')) {
          setSubmission('Wrong Answer');
          outputData = outputData
            .replace('solution:', '')
            .replace('correct:false', '');
        }
      } else {
        if (output.data === 'Out of Memory') {
          setSubmission('Out of Memory');
        } else {
          setSubmission('Runtime Error');
        }
      }
    }

    setResults(outputData.replace('solution:', ''));
  } catch (error) {
    console.log(error);
    setSubmission('Server Error');
    setResults(null);
  }
}
