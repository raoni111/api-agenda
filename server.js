import { env } from './.eslintrc';
import app from './app';

const HOST = 'localhost' | process.env.HOST;

const PORT = '3030' | process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
