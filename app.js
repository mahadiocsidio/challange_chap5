require('dotenv').config();
const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use('/api', require('./routes/user_routes'));
app.get('/api', (req, res) => res.send('OK'));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});