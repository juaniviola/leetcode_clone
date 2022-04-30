import app from './app.js';

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log('[api] Running on port', PORT));
