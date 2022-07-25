import app from './app';

const HOST = 'localhost';

const PORT = '3030';

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
