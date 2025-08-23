/* Calls your Python/Rust/TF model through child process or PythonShell */
import { PythonShell } from 'python-shell';
import path from 'path';

export const classifyEmotion = text =>
  new Promise((resolve, reject) => {
    const pyshell = new PythonShell('run_emotion_model.py', {
      scriptPath: path.resolve('ml-model'),
      args: [text]
    });
    pyshell.on('message', msg => resolve(JSON.parse(msg)));
    pyshell.on('error',   err => reject(err));
  });
