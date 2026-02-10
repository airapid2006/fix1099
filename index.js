// index.js
const express = require('express');
const { evaluate1099 } = require('./judge1099');
const { getPolicyEngine } = require('./policies');

const app = express();
app.use(express.json());

app.post('/api/evaluate', async (req, res) => {
  try {
    const { userId, payload } = req.body;
    if (!userId || !payload) {
      return res.status(400).json({ code: 400, message: 'Missing userId or payload' });
    }

    const policyEngine = getPolicyEngine();
    const result = await evaluate1099(payload, policyEngine);

    return res.json({ code: 200, data: result });
  } catch (err) {
    const status = err?.statusCode ?? 500;
    const message = err?.message ?? 'Internal Server Error';
    return res.status(status).json({ code: status, message });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ code: 500, message: 'Unhandled server error' });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
