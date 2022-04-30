import { writeFile } from 'fs';
import { exec } from 'child_process';

export const createFolder = (path, name) => {
  return new Promise((resolve, reject) => {
    exec(`cd ${path} && mkdir ${name}`, (err, _, __) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

export const createFiles = (path, input, evaluator, correct, main) => {
  return new Promise((resolve, reject) => {
    const writeSolutionFile = () => {
      writeFile(path.concat(main.name), main.string, (err) => {
        if (err) return reject(err);
        resolve();
      });
    };

    const writeCorrectFile = () => {
      writeFile(path.concat(correct.name), correct.string, (err) => {
        if (err) return reject(err);
        writeSolutionFile();
      });
    };

    const writeEvaluatorFile = () => {
      writeFile(path.concat(evaluator.name), evaluator.string, (err) => {
        if (err) return reject(err);
        writeCorrectFile();
      });
    };

    const writeInputFile = () => {
      writeFile(path.concat(input.name), input.string, (err) => {
        if (err) return reject(err);
        writeEvaluatorFile();
      });
    };

    writeInputFile();
  });
};

export const runCode = (cmd, timeout, name) => {
  return new Promise((resolve, reject) => {
    exec(cmd, { timeout, killSignal: 'SIGKILL' }, (err, stdout, stderr) => {
      if (stderr) {
        if (stderr.startsWith('docker: Error response from daemon: OCI runtime'))
          reject('Out of Memory 64MB');
        else
          reject(stderr);
      }

      if (err) {
        if (err.killed) {
          exec(`docker kill ${name}`);
          resolve(`${stdout} \nTimeout after ${timeout}ms`)
        } else
          reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
};

export const deleteFolder = (path) => {
  return new Promise((resolve, reject) => {
    exec(`rm -rf ${path}`, (err, _, __) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
