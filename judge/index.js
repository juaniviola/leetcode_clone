import app from './app.js';

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => console.log('[server] Running on port:', PORT));
