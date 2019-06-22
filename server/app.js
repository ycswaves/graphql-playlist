require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const { DB_HOST, DB_USER, DB_PASS } = process.env;
const app = express();

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`);
mongoose.connection.once('open', () => {
  console.log('connected to db');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`);
});
