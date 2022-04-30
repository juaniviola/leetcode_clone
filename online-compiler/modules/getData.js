import axios from 'axios';

export const getProblemList = async (setStatements, setLoading) => {
  try {
    const res = await axios.get('http://localhost:5050/problems');
    setStatements([...res.data]);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const getProblem = async (setLoading, setStatement, pid) => {
  if (!pid) return;

  try {
    const res = await axios.get(`http://localhost:5050/problem/${pid}`);
    setStatement({
      title: res.data.title.stringValue,
      statement: res.data.statement.stringValue,
      hints: res.data.hints.arrayValue.values.map((value) => value.stringValue),
      templates: res.data.templates.arrayValue.values.map(
        (value) => value.stringValue.split('_n').join('\n'),
      ),
      input: res.data.input.stringValue.split('_n').join('\n'),
    });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
