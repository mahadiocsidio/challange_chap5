require('dotenv').config();
const express = require('express');
const { prismaErrorHandler, errorHandler, notFound } = require('./middlewares/prisma.error');
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use('/api/v1', require('./routes/all.routes'));
app.get('/api', (req, res) => res.send('OK'));

app.use(prismaErrorHandler);
app.use(notFound);
app.use(errorHandler)

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

module.exports = app