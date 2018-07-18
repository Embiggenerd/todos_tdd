const app = require('./src/app');
const PORT = 3000;
const mongoose = require('mongoose');

const devDB = `mongodb://localhost/todos_tdd_dev`;

mongoose.connect(
  devDB,
  () => console.log(`connected to ${devDB}`)
);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
