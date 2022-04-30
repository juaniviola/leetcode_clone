import express from 'express';
import getEvaluator from '../modules/getData.js';
import evaluateCode from '../modules/evaluateCode.js';

const app = express.Router();

app.post('/', async (req, res) => {
  const { id, code, language, problem } = req.body;

  if (!id || !code || !language) { return res.sendStatus(400); }

  try {
    const getData = await getEvaluator(problem, language, 'run');
    const { evaluator, correct, input } = getData.data;
    const output = await evaluateCode(id, code, language, { evaluator, correct, input });

    res.json(output);
  } catch (error) {
    res.send(error);
  }
});

app.post('/judge', async (req, res) => {
  const { id, code, language, problem } = req.body;

  if (!id || !code || !language) { return res.sendStatus(400); }

  try {
    const getData = await getEvaluator(problem, language, 'submit');
    const { evaluator, correct, input } = getData.data;
    const output = await evaluateCode(id, code, language, { evaluator, correct, input });

    if (output.includes('correct:true'))
      res.send('Accepted');
    else if (output.includes('correct:false'))
      res.send('Wrong Answer');
    else if (output.includes('Timeout after'))
      res.send('Time Limited Exceded');
    else
      res.send(output);
  } catch (error) {
    await deleteFolder(fullPath);
    if (typeof error === 'string')
      return res.send(error);

    res.send('Out of Memory');
  }
});

export default app;
