import express from 'express';

const app = express.Router();

app.get('/problems', async (req, res) => {
  const firestore = req.app.get('firestore');

  try {
    const problemList = await firestore.getProblemList();
    const statements = [];

    problemList.forEach((doc) => statements.push({ id: doc.id, title: doc.data().title }));

    res.json(statements);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.get('/problem/:id', async (req, res) => {
  const { id } = req.params;
  const firestore = req.app.get('firestore');

  try {
    const statement = await firestore.getStatement(id);

    res.json(statement);
  } catch (error) {
    res.sendStatus(404);
  }
});

app.get('/evaluator/:id/:language/:mode', async (req, res) => {
  const { id, language, mode } = req.params;
  const firestore = req.app.get('firestore');

  try {
    const data = await firestore.getProblem(id);
    const evaluators = data[language].arrayValue.values;

    const evaluator = {
      evaluator: evaluators[1].stringValue.split('_n').join('\n'),
      correct: evaluators[2].stringValue.split('_n').join('\n'),
      input: mode === 'run' ? evaluators[0].stringValue : data.cpp.arrayValue.values[3].stringValue,
    };

    res.json(evaluator);
  } catch (error) {
    res.sendStatus(404);
  }
});

export default app;
