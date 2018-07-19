const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/schema');

const port = 8722;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port , console.log('server started'));