const app = require('./src/app');

const mongoose = require('mongoose');

const devDB = `mongodb://localhost/todos_tdd_dev`;

const prodDB =
  'mongodb://george123:jungle123@ds161322.mlab.com:61322/todos_tdd_prod';

mongoose.connect(
  devDB,
  () => console.log(`connected to ${devDB}`)
);

app.listen(process.env.PORT, () =>
  console.log(`listening on http://localhost:3000`)
);
