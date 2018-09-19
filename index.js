const app = require('./src/app');

const mongoose = require('mongoose');

const devDB = `mongodb://localhost/todos_tdd_dev`;

const prodDB = `mongodb://${process.env.PROD_DB_USER}:${
  process.env.PROD_DB_PASS
}.mlab.com:61322/todos_tdd_prod`;

const db = () => {
  if (process.env.NODE_ENV === 'production') {
    return prodDB;
  }
  return devDB;
};

const port = () => {
  return process.env.PORT || 3000;
};

mongoose.connect(
  db(),
  () => console.log(`connected to ${db()}`)
);

app.listen(port(), () =>
  console.log(`listening on http://localhost:${port()}`)
);
