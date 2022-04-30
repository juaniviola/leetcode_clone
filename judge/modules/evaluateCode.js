import { createFolder, createFiles, runCode, deleteFolder } from './runCode.js';
import commands from './commands.js';
import config from '../config.js';

const { judgePath } = config;

export default async function evaluateCode(id, code, language, { evaluator, correct, input }) {
  const fullPath = `${judgePath}\\${id}`;

  try {
    const cmd = commands(fullPath, id)[language];

    await createFolder(judgePath, id);
    await createFiles(
      fullPath,
      { name: `\\input.txt`, string: input },
      { name: `\\main.${language}`, string: evaluator },
      { name: `\\Correct.${language}`, string: correct },
      { name: `\\Solution.${language}`, string: code },
    );
    const output = await runCode(cmd, 15000, id);
    await deleteFolder(fullPath);

    return output;
  } catch (error) {
    await deleteFolder(fullPath);
    if (typeof error === 'string')
      return error;

    return 'Out of Memory';
  }
}
